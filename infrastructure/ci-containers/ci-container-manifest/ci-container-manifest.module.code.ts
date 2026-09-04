import { HOSTNAME_KEY } from "@akasha/k8s-types/hostnames"
import { rootEnvName } from "@akasha/pages-system/checkout-roots"
import { buildEntrypoint } from "../ci-container-entrypoint/ci-container-entrypoint.module.code.ts"
import {
  akashaTreePath,
  buildContainerName,
  checkoutPath,
  STEP_LABEL_KEY,
  sanitizeDnsName,
  shortCommit,
} from "../ci-container-name/ci-container-name.module.code.ts"
import { CI_NAMESPACE } from "../ci-dispatch-cluster/ci-dispatch-cluster.module.code.ts"
import {
  type Candidate,
  type ContainerPayload,
  isRecord,
  textList,
} from "../ci-dispatch-shapes/ci-dispatch-shapes.module.code.ts"
import { CI_MEMBER_KEY } from "../ci-node-capacity/ci-node-capacity.module.code.ts"

const UNIVERSAL_IMAGE = "debian:bookworm-slim"

const CI_SECRET_NAME = "pipeline-engine-secrets"

const COMMIT_SHAPE = /^[0-9a-f]{40}$/

interface EnvEntry {
  readonly name: string
  readonly value?: string
  readonly valueFrom?: { readonly secretKeyRef: { readonly name: string; readonly key: string } }
}

function toolchainEnv(image: string): readonly EnvEntry[] {
  if (image !== UNIVERSAL_IMAGE) return []
  return [
    {
      name: "PATH",
      value: "/ci-storage/tools:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    },
    { name: "LD_LIBRARY_PATH", value: "/ci-storage/tools/lib" },
    { name: "GIT_EXEC_PATH", value: "/ci-storage/tools/git-core" },
    { name: "SSL_CERT_FILE", value: "/ci-storage/tools/ssl/ca-certificates.crt" },
  ]
}

function stepEnv(environment: unknown): readonly EnvEntry[] {
  if (!isRecord(environment)) return []
  const out: EnvEntry[] = []
  for (const [name, held] of Object.entries(environment)) {
    if (typeof held === "string") out.push({ name, value: held })
    else if (isRecord(held) && typeof held.fromSecret === "string") {
      out.push({
        name,
        valueFrom: { secretKeyRef: { name: CI_SECRET_NAME, key: held.fromSecret } },
      })
    } else {
      throw new Error(
        `the step asks for environment variable ${name} but states neither a string nor a \`fromSecret\`, so nothing can be put in it`
      )
    }
  }
  return out
}

function buildEnv(
  candidate: Candidate,
  containerName: string,
  gitAccessToken: string
): readonly EnvEntry[] {
  const image = typeof candidate.definition.image === "string" ? candidate.definition.image : ""
  const workspace = checkoutPath(candidate.pipelineCommit)
  return [
    ...toolchainEnv(image),
    { name: "HOME", value: "/tmp" },
    { name: "BUN_TMPDIR", value: "/tmp" },
    { name: "XDG_CACHE_HOME", value: "/tmp" },
    { name: "BUN_INSTALL", value: "/tmp/.bun" },
    { name: "DOCKER_CONFIG", value: "/tmp/.docker" },
    ...stepEnv(candidate.definition.environment),
    ...(gitAccessToken === "" ? [] : [{ name: "GIT_ACCESS_TOKEN", value: gitAccessToken }]),
    { name: "PIPELINE_SEQ", value: candidate.pipelineSeq },
    { name: "CI_SEQ", value: candidate.pipelineSeq },
    { name: "WORKFLOW_NAME", value: candidate.workflowSlug },
    { name: "STEP_NAME", value: candidate.stepName },
    { name: "CI_COMMIT_SHA", value: candidate.pipelineCommit },
    { name: "BRANCH", value: candidate.pipelineBranch },
    { name: "CONTAINER_NAME", value: containerName },
    { name: "WORKSPACE", value: workspace },
    { name: rootEnvName("code"), value: workspace },
    { name: rootEnvName("akasha"), value: akashaTreePath(candidate.pipelineInstructionsCommit) },
    ...(candidate.inputsHash === null
      ? []
      : [{ name: "INPUTS_HASH", value: candidate.inputsHash }]),
    {
      name: "SUPABASE_URL",
      valueFrom: { secretKeyRef: { name: CI_SECRET_NAME, key: "SUPABASE_URL" } },
    },
    {
      name: "SUPABASE_SERVICE_ROLE_KEY",
      valueFrom: { secretKeyRef: { name: CI_SECRET_NAME, key: "SUPABASE_SERVICE_ROLE_KEY" } },
    },
  ]
}

function buildVolumes(secretMounts: unknown): {
  readonly volumes: readonly Record<string, unknown>[]
  readonly volumeMounts: readonly Record<string, unknown>[]
} {
  const volumes: Record<string, unknown>[] = [
    { name: "ci-storage", hostPath: { path: "/var/lib/ci-storage", type: "DirectoryOrCreate" } },
    { name: "tmp", emptyDir: { sizeLimit: "2Gi" } },
  ]
  const volumeMounts: Record<string, unknown>[] = [
    { name: "ci-storage", mountPath: "/ci-storage" },
    { name: "tmp", mountPath: "/tmp" },
  ]
  const asked = Array.isArray(secretMounts) ? secretMounts : []
  for (const [i, mount] of asked.entries()) {
    if (!isRecord(mount)) continue
    const secretName = mount.secretName
    const key = mount.key
    const mountPath = mount.mountPath
    if (
      typeof secretName !== "string" ||
      typeof key !== "string" ||
      typeof mountPath !== "string"
    ) {
      throw new Error(
        `secret mount ${i} states ${JSON.stringify(Object.keys(mount))}, and \`secretName\`, \`key\` and \`mountPath\` are all wanted as strings`
      )
    }
    const lastSlash = mountPath.lastIndexOf("/")
    const dir = lastSlash > 0 ? mountPath.slice(0, lastSlash) : "/"
    const file = lastSlash >= 0 ? mountPath.slice(lastSlash + 1) : mountPath
    const name = `secret-mount-${i}`
    const mode = typeof mount.mode === "number" ? mount.mode : 0o400
    volumes.push({ name, secret: { secretName, items: [{ key, path: file, mode }] } })
    volumeMounts.push({ name, mountPath: dir, readOnly: true })
  }
  return { volumes, volumeMounts }
}

function buildLabels(candidate: Candidate): Record<string, string> {
  const labels: Record<string, string> = {
    "app.kubernetes.io/name": "pipeline-engine-step",
    "app.kubernetes.io/managed-by": "pipeline-engine",
    "pipeline-engine/pipeline": candidate.pipelineSeq,
    "pipeline-engine/workflow": sanitizeDnsName(candidate.workflowSlug),
    [STEP_LABEL_KEY]: sanitizeDnsName(candidate.stepName),
    "pipeline-engine/sha": shortCommit(candidate.pipelineCommit),
  }
  if (COMMIT_SHAPE.test(candidate.pipelineCommit)) {
    labels["pipeline-engine/commit-sha"] = candidate.pipelineCommit
  }
  if (candidate.inputsHash !== null) labels["pipeline-engine/inputs-hash"] = candidate.inputsHash
  return labels
}

function mergeResources(asked: unknown): Record<string, unknown> {
  const defaults = {
    requests: { cpu: "100m", memory: "512Mi" } as Record<string, string>,
    limits: { memory: "1Gi" } as Record<string, string>,
  }
  const over = isRecord(asked) ? asked : {}
  const bag = (held: unknown): Record<string, string> => {
    const out: Record<string, string> = {}
    if (!isRecord(held)) return out
    if (typeof held.cpu === "string") out.cpu = held.cpu
    if (typeof held.memory === "string") out.memory = held.memory
    return out
  }
  return {
    requests: { ...defaults.requests, ...bag(over.requests) },
    limits: { ...defaults.limits, ...bag(over.limits) },
  }
}

export interface BuildContainerArgs {
  readonly candidate: Candidate
  readonly gitAccessToken: string
  readonly nodeName?: string
  readonly confineToNode?: string
}

export function buildContainerPayload(args: BuildContainerArgs): ContainerPayload | null {
  const { candidate } = args
  const image = candidate.definition.image
  const commands = textList(candidate.definition.commands)
  if (typeof image !== "string" || image === "" || commands.length === 0) return null

  const containerName = buildContainerName(
    candidate.pipelineSeq,
    candidate.stepName,
    candidate.pipelineCommit
  )
  const shell = textList(candidate.definition.shell)
  const runAsUser = candidate.definition["run-as-user"]
  const { volumes, volumeMounts } = buildVolumes(candidate.definition["secret-mounts"])

  const spec: Record<string, unknown> = {
    restartPolicy: "Never",
    nodeSelector: {
      [CI_MEMBER_KEY]: "true",
      ...(args.confineToNode === undefined ? {} : { [HOSTNAME_KEY]: args.confineToNode }),
    },
    securityContext: { runAsUser: 1000, runAsGroup: 1000, fsGroup: 1000 },
    initContainers: [
      {
        name: "fix-cache-permissions",
        image: "busybox:stable",
        command: ["sh", "-c", "chown 1000:1000 /ci-storage"],
        volumeMounts: [{ name: "ci-storage", mountPath: "/ci-storage" }],
        resources: {
          requests: { cpu: "10m", memory: "16Mi" },
          limits: { cpu: "50m", memory: "32Mi" },
        },
        securityContext: { runAsUser: 0, allowPrivilegeEscalation: false },
      },
    ],
    containers: [
      {
        name: "step",
        image,
        imagePullPolicy: "IfNotPresent",
        command: [...(shell.length > 0 ? shell : ["/bin/sh", "-c"]), buildEntrypoint(candidate)],
        env: buildEnv(candidate, containerName, args.gitAccessToken),
        volumeMounts,
        resources: mergeResources(candidate.definition.resources),
        securityContext: {
          allowPrivilegeEscalation: false,
          capabilities:
            runAsUser === 0
              ? { drop: ["ALL"], add: ["DAC_OVERRIDE", "CHOWN", "FOWNER"] }
              : { drop: ["ALL"], add: ["DAC_OVERRIDE"] },
          ...(typeof runAsUser === "number" ? { runAsUser } : {}),
        },
      },
    ],
    volumes,
    ...(args.nodeName === undefined ? {} : { nodeName: args.nodeName }),
    ...(typeof candidate.definition["service-account-name"] === "string"
      ? { serviceAccountName: candidate.definition["service-account-name"] }
      : {}),
  }

  return {
    containerName,
    manifest: {
      apiVersion: "v1",
      kind: "Pod",
      metadata: { name: containerName, namespace: CI_NAMESPACE, labels: buildLabels(candidate) },
      spec,
    },
  }
}
