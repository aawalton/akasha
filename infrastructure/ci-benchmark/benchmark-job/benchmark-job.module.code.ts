import { git } from "@akasha/git/git-capping"
import { type Hostname, hostnameSelector } from "@akasha/k8s-types/hostnames"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import {
  buildToolchainProvisionScript,
  buildToolchainVerifyScript,
} from "../benchmark-provision/benchmark-provision.module.code.ts"
import type { StoreVariant } from "../benchmark-report-types/benchmark-report-types.module.code.ts"

const DEFAULT_NAMESPACE = "ci"

const DEFAULT_IMAGE = "buildpack-deps:bookworm-scm"

const CONTAINER_HOME = "/root"

const CI_SECRET_NAME = "pipeline-engine-secrets"
const TRANSPORT_HOST = "git-transport.git.svc.cluster.local:3000"
const AKASHA_REPO_PATH = "alan/akasha.git"

const INSTRUCTIONS_DIR = "/instructions"

const CLONE_TIMEOUT_SECONDS = 120

const INSTALL_TIMEOUT_SECONDS = 600

const DEPENDENCIES_PROBE =
  "infrastructure/ci-benchmark/instructions-tree-dependencies/instructions-tree-dependencies.module.code.ts"

const RUNNER_PATH =
  "infrastructure/ci-benchmark/benchmark-running/benchmark-running.module.code.ts"

function storeMountPath(home: string): string {
  return `${home}/.cache/pipeline-engine/ci-storage`
}

interface K8sResourceQuantities {
  readonly cpu: string
  readonly memory: string
}

export interface BenchmarkJobResources {
  readonly requests: K8sResourceQuantities
  readonly limits: K8sResourceQuantities
}

export function resolveBenchmarkResources(
  node: string,
  store: StoreVariant
): BenchmarkJobResources {
  const isNode03 = node === "node-03"
  const memRequest = store === "memory" ? "12Gi" : isNode03 ? "2Gi" : "4Gi"
  const memLimit = store === "memory" ? "16Gi" : isNode03 ? "4Gi" : "12Gi"
  const cpuRequest = isNode03 ? "500m" : "1"
  const cpuLimit = isNode03 ? "4" : "8"
  return {
    requests: { cpu: cpuRequest, memory: memRequest },
    limits: { cpu: cpuLimit, memory: memLimit },
  }
}

function sanitizeName(value: string): string {
  const lowered = value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
  const trimmed = lowered.replace(/^-+/, "").replace(/-+$/, "")
  return trimmed.slice(0, 63).replace(/-+$/, "")
}

interface EmptyDirMemory {
  readonly medium: "Memory"
  readonly sizeLimit: "8Gi"
}

function storeEmptyDir(store: StoreVariant): EmptyDirMemory | Record<string, never> {
  return store === "memory" ? { medium: "Memory", sizeLimit: "8Gi" } : {}
}

function instructionsCommit(): string {
  const root = rootFor(resolveRoots(), AKASHA)
  const said = git(root, ["rev-parse", "HEAD"])
  if (said.code !== 0) {
    throw new Error(
      `buildBenchmarkJob: the instructions commit at ${root} could not be read, and the harness this ` +
        "job runs is fixed to one. Left unpinned the pod would take whatever main held when it started, " +
        "so the run would not be the tree that composed it."
    )
  }
  return said.stdout.trim()
}

function acquireInstructions(commit: string): readonly string[] {
  const authed = `http://x-access-token:$GIT_ACCESS_TOKEN@${TRANSPORT_HOST}/${AKASHA_REPO_PATH}`
  return [
    `echo "[prelude] instructions tree ${commit} (excluded from every timed phase)"`,
    `INSTRUCTIONS_COMMIT=${commit}`,
    'SCRATCH="$(mktemp -d /var/tmp/instructions-tree-XXXXXX)"',
    `mkdir -p ${INSTRUCTIONS_DIR}`,
    `timeout ${String(CLONE_TIMEOUT_SECONDS)} git clone --bare --quiet --single-branch --branch main "${authed}" "$SCRATCH/instructions.git"`,
    `git -C "$SCRATCH/instructions.git" cat-file -e "$INSTRUCTIONS_COMMIT^{commit}" || { echo "the instructions commit $INSTRUCTIONS_COMMIT this job was composed at is not reachable from ${TRANSPORT_HOST}, so the harness it fixes cannot be stood up" >&2; exit 1; }`,
    'git -C "$SCRATCH/instructions.git" archive --format=tar -o "$SCRATCH/instructions.tar" "$INSTRUCTIONS_COMMIT"',
    `tar -x -f "$SCRATCH/instructions.tar" -C ${INSTRUCTIONS_DIR}`,
    `( cd ${INSTRUCTIONS_DIR} && timeout ${String(INSTALL_TIMEOUT_SECONDS)} bun install --frozen-lockfile ) || { echo "the instructions tree $INSTRUCTIONS_COMMIT extracted at ${INSTRUCTIONS_DIR}, and bun install --frozen-lockfile either refused this commit's bun.lock or did not finish inside ${String(INSTALL_TIMEOUT_SECONDS)}s, so no code in the tree can be run" >&2; exit 1; }`,
    `bun "${INSTRUCTIONS_DIR}/${DEPENDENCIES_PROBE}"`,
    'rm -rf "$SCRATCH"',
  ]
}

async function buildCommand(commit: string): Promise<readonly string[]> {
  const authedUrl = `http://x-access-token:$GIT_ACCESS_TOKEN@${TRANSPORT_HOST}/${AKASHA_REPO_PATH}`
  const script = [
    "set -eu",
    'echo "[prelude] shallow clone to obtain harness (excluded from every timed phase)"',
    `git clone --depth 1 "${authedUrl}" /prelude`,
    `git -C /prelude fetch --depth 1 origin "$TARGET_SHA" || true`,
    `git -C /prelude checkout --quiet "$TARGET_SHA"`,
    'CACHE="$HOME/.cache/pipeline-engine/ci-storage"',
    'export TOOLS="$CACHE/tools"',
    'mkdir -p "$TOOLS"',
    ...buildToolchainProvisionScript(),
    'ln -sfn "$CACHE" /ci-storage',
    'export PATH="$TOOLS:$PATH"',
    ...buildToolchainVerifyScript(),
    "cd /prelude",
    'echo "[prelude] bun install (untimed — resolves the runner workspace imports)"',
    "export HUSKY=0",
    "bun install --frozen-lockfile",
    ...acquireInstructions(commit),
    `exec bun ${INSTRUCTIONS_DIR}/${RUNNER_PATH} --sha "$TARGET_SHA" --node "$NODE_NAME" --store "$STORE" --instructions-root ${INSTRUCTIONS_DIR}`,
  ].join("\n")
  return ["/bin/sh", "-c", script]
}

interface K8sEnvVar {
  readonly name: string
  readonly value?: string
  readonly valueFrom?: { readonly secretKeyRef: { readonly name: string; readonly key: string } }
}

function secretEnv(name: string, key: string): K8sEnvVar {
  return { name, valueFrom: { secretKeyRef: { name: CI_SECRET_NAME, key } } }
}

function buildEnv(args: {
  node: string
  store: StoreVariant
  targetSha: string
}): readonly K8sEnvVar[] {
  return [
    { name: "HOME", value: CONTAINER_HOME },
    { name: "TARGET_SHA", value: args.targetSha },
    { name: "NODE_NAME", value: args.node },
    { name: "STORE", value: args.store },
    secretEnv("GIT_ACCESS_TOKEN", "GIT_ACCESS_TOKEN"),
    secretEnv("SUPABASE_URL", "SUPABASE_URL"),
    secretEnv("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SERVICE_ROLE_KEY"),
    secretEnv("AGE_SECRET_KEY", "AGE_SECRET_KEY"),
  ]
}

export interface BuildBenchmarkJobArgs {
  readonly node: Hostname
  readonly store: StoreVariant
  readonly targetSha: string
  readonly runId: string
  readonly namespace?: string
  readonly image?: string
}

export interface BenchmarkJobManifest {
  readonly apiVersion: "batch/v1"
  readonly kind: "Job"
  readonly metadata: {
    readonly name: string
    readonly namespace: string
    readonly labels: Record<string, string>
  }
  readonly spec: {
    readonly backoffLimit: 0
    readonly template: {
      readonly metadata: { readonly labels: Record<string, string> }
      readonly spec: {
        readonly nodeSelector: ReturnType<typeof hostnameSelector>
        readonly restartPolicy: "Never"
        readonly securityContext: { readonly runAsUser: 0 }
        readonly containers: readonly {
          readonly name: string
          readonly image: string
          readonly command: readonly string[]
          readonly env: readonly K8sEnvVar[]
          readonly volumeMounts: readonly { readonly name: string; readonly mountPath: string }[]
          readonly resources: BenchmarkJobResources
        }[]
        readonly volumes: readonly {
          readonly name: string
          readonly emptyDir: EmptyDirMemory | Record<string, never>
        }[]
      }
    }
  }
}

export async function buildBenchmarkJob(
  args: BuildBenchmarkJobArgs
): Promise<BenchmarkJobManifest> {
  const {
    node,
    store,
    targetSha,
    runId,
    namespace = DEFAULT_NAMESPACE,
    image = DEFAULT_IMAGE,
  } = args
  const name = sanitizeName(`ci-benchmark-${node}-${store}-${runId}`)
  const labels: Record<string, string> = {
    "app.kubernetes.io/name": "ci-benchmark",
    "pipeline-engine/benchmark-node": sanitizeName(node),
    "pipeline-engine/benchmark-store": store,
  }
  const resources = resolveBenchmarkResources(node, store)
  const mountPath = storeMountPath(CONTAINER_HOME)
  const command = await buildCommand(instructionsCommit())

  return {
    apiVersion: "batch/v1",
    kind: "Job",
    metadata: { name, namespace, labels },
    spec: {
      backoffLimit: 0,
      template: {
        metadata: { labels },
        spec: {
          nodeSelector: hostnameSelector(node),
          restartPolicy: "Never",
          securityContext: { runAsUser: 0 },
          containers: [
            {
              name: "benchmark",
              image,
              command,
              env: buildEnv({ node, store, targetSha }),
              volumeMounts: [{ name: "store", mountPath }],
              resources,
            },
          ],
          volumes: [{ name: "store", emptyDir: storeEmptyDir(store) }],
        },
      },
    },
  }
}
