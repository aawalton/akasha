import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { commitOver } from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import {
  orchestratorCacheEntrypointPath,
  orchestratorCacheVolumeMounts,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-helpers/orchestrator-cache-helpers.module.code.ts"
import {
  BUN_RUNTIME_IMAGE,
  type CacheLocation,
  CONTAINER_TMP_PATH,
  ORCHESTRATOR_CACHE_MOUNT_PATH,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "akasha/infrastructure/cluster/k8s-type/modules/orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"

interface GitAccessTokenRef {
  secretName: string
  secretKey: string
}

function resolveMemorySpec(memory: string | { request: string; limit: string }): {
  request: string
  limit: string
} {
  return typeof memory === "string" ? { request: memory, limit: memory } : memory
}

const SHA = /^[0-9a-f]{40}$/

export const CHECKOUT_PLACEHOLDER = "CHECKOUT_COMMIT"

export function commitHere(): string {
  const pinned = commitOver(import.meta.dir)
  if (pinned !== null && SHA.test(pinned)) return pinned
  const done = ran(["git", "-C", import.meta.dir, "rev-parse", "HEAD"])
  const sha = done.out.trim()
  if (done.code !== 0 || !SHA.test(sha)) {
    throw new Error(
      `the commit this manifest is composed at could not be read from ${import.meta.dir}, and a pod given a branch instead would move off the commit deployed — ${done.err.trim()}`
    )
  }
  return sha
}

const CACHE_LOCK = `${ORCHESTRATOR_CACHE_MOUNT_PATH}/.init-lock`
const LOCK_WAIT_SECONDS = 900
const NEXT_BUILD_AT = "build.next"
const PRIOR_BUILD_AT = "build.old"
export const BUILDER_AT = "node_modules/.bin/react-router"

export const BUILD_STAMP = ".built-from"
export const SERVED_BUILD_AT = "build"

function holdingCacheLock(who: string, body: readonly string[]): readonly string[] {
  return [
    `LOCK="${CACHE_LOCK}"`,
    'touch "$LOCK"',
    "(",
    "  attempts=0",
    "  until flock -n 9; do",
    "    attempts=$((attempts+1))",
    `    if [ "$attempts" -ge ${LOCK_WAIT_SECONDS} ]; then`,
    `      echo "${who}: timed out waiting for lock after \${attempts}s" >&2`,
    "      exit 1",
    "    fi",
    "    sleep 1",
    "  done",
    ...body.map((line) => `  ${line}`),
    ') 9>"$LOCK"',
  ]
}

function checkoutSteps(sha: string): readonly string[] {
  return [
    `rm -f ${ORCHESTRATOR_CACHE_REPO_PATH}/.git/index.lock`,
    `find ${ORCHESTRATOR_CACHE_REPO_PATH}/.git/refs ${ORCHESTRATOR_CACHE_REPO_PATH}/.git/logs/refs -name '*.lock' -delete 2>/dev/null || true`,
    `trap 'rm -f ${ORCHESTRATOR_CACHE_REPO_PATH}/.git/index.lock' EXIT INT TERM`,
    `cd ${ORCHESTRATOR_CACHE_REPO_PATH}`,
    "git fetch origin main",
    `git reset --hard ${sha}`,
  ]
}

export function webCheckoutAndBuild(packagePath: string, sha: string): string {
  const steps = [...checkoutSteps(sha), ...webBuildSteps(packagePath, sha)].join(" && ")
  return holdingCacheLock("build", [steps]).join("\n")
}

function webBuildSteps(packagePath: string, sha: string): readonly string[] {
  return [
    `cd ${ORCHESTRATOR_CACHE_REPO_PATH}`,
    "bun install --frozen-lockfile",
    `cd ${orchestratorCacheEntrypointPath(packagePath)}`,
    `rm -rf ${NEXT_BUILD_AT} ${PRIOR_BUILD_AT}`,
    `BUILD_DIRECTORY=${NEXT_BUILD_AT} ${ORCHESTRATOR_CACHE_REPO_PATH}/${BUILDER_AT} build`,
    `printf %s ${sha} > ${NEXT_BUILD_AT}/${BUILD_STAMP}`,
    `mkdir -p ${SERVED_BUILD_AT}`,
    `mv ${SERVED_BUILD_AT} ${PRIOR_BUILD_AT}`,
    `mv ${NEXT_BUILD_AT} ${SERVED_BUILD_AT}`,
    `rm -rf ${PRIOR_BUILD_AT}`,
  ]
}

export function orchestratorCacheInitContainer(opts: {
  gitAccessTokenRef: GitAccessTokenRef
  location: CacheLocation
  memory?: string | { request: string; limit: string }
  commit?: string
}): object {
  const memorySpec = resolveMemorySpec(opts.memory ?? "4Gi")
  const commit = opts.commit ?? commitHere()
  const script = [
    "set -e",
    `mkdir -p ${ORCHESTRATOR_CACHE_MOUNT_PATH}`,
    ...holdingCacheLock("init-code", [
      `rm -f ${ORCHESTRATOR_CACHE_REPO_PATH}/.git/index.lock`,
      `if git -C ${ORCHESTRATOR_CACHE_REPO_PATH} rev-parse HEAD >/dev/null 2>&1; then`,
      `  WANT=$(printf %s "${opts.location.cloneOriginUrl}" | sed "s|^.*@||")`,
      `  HAVE=$(git -C ${ORCHESTRATOR_CACHE_REPO_PATH} config --get remote.origin.url 2>/dev/null | sed "s|^.*@||")`,
      `  if [ "$HAVE" != "$WANT" ]; then`,
      `    echo "init-code: origin is $HAVE but this pod is for $WANT — repointing"`,
      `    git -C ${ORCHESTRATOR_CACHE_REPO_PATH} remote set-url origin "${opts.location.cloneOriginUrl}"`,
      `  fi`,
      `  echo "init-code: ${ORCHESTRATOR_CACHE_REPO_PATH} already cloned, fetching origin and resetting to ${commit}"`,
      `  git -C ${ORCHESTRATOR_CACHE_REPO_PATH} fetch origin --prune`,
      `  git -C ${ORCHESTRATOR_CACHE_REPO_PATH} reset --hard ${commit}`,
      `  echo "init-code: source-sync to ${commit} complete"`,
      "else",
      `  if [ -e ${ORCHESTRATOR_CACHE_REPO_PATH} ]; then`,
      `    echo "init-code: ${ORCHESTRATOR_CACHE_REPO_PATH} exists but HEAD is unreadable — wiping partial state"`,
      `    rm -rf ${ORCHESTRATOR_CACHE_REPO_PATH}`,
      "  fi",
      `  echo "init-code: cloning monorepo into ${ORCHESTRATOR_CACHE_REPO_PATH}"`,
      `  git clone --branch main "${opts.location.cloneOriginUrl}" ${ORCHESTRATOR_CACHE_REPO_PATH}`,
      `  git -C ${ORCHESTRATOR_CACHE_REPO_PATH} reset --hard ${commit}`,
      `  echo "init-code: clone complete at ${commit}"`,
      "fi",
      `echo "init-code: running bun install --frozen-lockfile"`,
      `cd ${ORCHESTRATOR_CACHE_REPO_PATH} && bun install --frozen-lockfile`,
      `echo "init-code: bun install complete"`,
    ]),
  ].join("\n")

  return {
    name: "init-code",
    image: BUN_RUNTIME_IMAGE,
    imagePullPolicy: "IfNotPresent",
    command: ["sh", "-c", script],
    env: [
      {
        name: "GIT_ACCESS_TOKEN",
        valueFrom: {
          secretKeyRef: {
            name: opts.gitAccessTokenRef.secretName,
            key: opts.gitAccessTokenRef.secretKey,
          },
        },
      },
      { name: "HOME", value: CONTAINER_TMP_PATH },
    ],
    resources: {
      requests: { cpu: "200m", memory: memorySpec.request },
      limits: { memory: memorySpec.limit },
    },
    securityContext: {
      runAsNonRoot: true,
      runAsUser: 1000,
      readOnlyRootFilesystem: true,
      allowPrivilegeEscalation: false,
      capabilities: { drop: ["ALL"] },
    },
    volumeMounts: orchestratorCacheVolumeMounts(),
  }
}

export function webBuildInitContainer(opts: { packagePath: string; secretName: string }): object {
  const script = [
    "set -e",
    ...holdingCacheLock("init-build", [
      `cd ${orchestratorCacheEntrypointPath(opts.packagePath)}`,
      `CHECKED_OUT=$(git -C ${ORCHESTRATOR_CACHE_REPO_PATH} rev-parse HEAD)`,
      `BUILT_FROM=$(cat ${SERVED_BUILD_AT}/${BUILD_STAMP} 2>/dev/null || true)`,
      `if [ -f ${SERVED_BUILD_AT}/server/index.js ] && [ "$BUILT_FROM" = "$CHECKED_OUT" ]; then`,
      '  echo "init-build: the build beside the server is of $CHECKED_OUT already"',
      "  exit 0",
      "fi",
      'echo "init-build: the build beside the server is of ${BUILT_FROM:-nothing}, the checkout is of $CHECKED_OUT"',
      "NEXT_PUBLIC_BUILD_SHA=$CHECKED_OUT",
      "VITE_BUILD_SHA=$CHECKED_OUT",
      "export NEXT_PUBLIC_BUILD_SHA VITE_BUILD_SHA",
      `echo "init-build: building ${opts.packagePath} at $CHECKED_OUT"`,
      ...webBuildSteps(opts.packagePath, '"$CHECKED_OUT"'),
      'echo "init-build: build complete"',
    ]),
  ].join("\n")

  return {
    name: "init-build",
    image: BUN_RUNTIME_IMAGE,
    imagePullPolicy: "IfNotPresent",
    command: ["sh", "-c", script],
    envFrom: [{ secretRef: { name: opts.secretName } }],
    env: [
      { name: "HOME", value: CONTAINER_TMP_PATH },
      { name: "NODE_ENV", value: "production" },
    ],
    resources: {
      requests: { cpu: "500m", memory: "1Gi" },
      limits: { memory: "4Gi" },
    },
    securityContext: {
      runAsNonRoot: true,
      runAsUser: 1000,
      readOnlyRootFilesystem: true,
      allowPrivilegeEscalation: false,
      capabilities: { drop: ["ALL"] },
    },
    volumeMounts: orchestratorCacheVolumeMounts(),
  }
}

export function orchestratorCacheChownInitContainer(): object {
  return {
    name: "init-chown-cache",
    image: BUN_RUNTIME_IMAGE,
    imagePullPolicy: "IfNotPresent",
    command: ["sh", "-c", `chown 1000:1000 ${ORCHESTRATOR_CACHE_MOUNT_PATH}`],
    resources: {
      requests: { cpu: "10m", memory: "16Mi" },
      limits: { memory: "16Mi" },
    },
    securityContext: {
      runAsNonRoot: false,
      runAsUser: 0,
    },
    volumeMounts: [{ name: "orchestrator-cache", mountPath: ORCHESTRATOR_CACHE_MOUNT_PATH }],
  }
}

export function orchestratorCacheSyncSidecar(opts: {
  gitAccessTokenRef: GitAccessTokenRef
  memory?: string | { request: string; limit: string }
}): object {
  const memorySpec = resolveMemorySpec(opts.memory ?? "1Gi")
  const env = [
    {
      name: "GIT_ACCESS_TOKEN",
      valueFrom: {
        secretKeyRef: {
          name: opts.gitAccessTokenRef.secretName,
          key: opts.gitAccessTokenRef.secretKey,
        },
      },
    },
    { name: "HOME", value: CONTAINER_TMP_PATH },
  ]
  return {
    name: "code-sync",
    image: BUN_RUNTIME_IMAGE,
    imagePullPolicy: "IfNotPresent",
    command: ["sh", "-c", "sleep infinity"],
    env,
    resources: {
      requests: { cpu: "10m", memory: memorySpec.request },
      limits: { memory: memorySpec.limit },
    },
    securityContext: {
      runAsNonRoot: true,
      runAsUser: 1000,
      readOnlyRootFilesystem: true,
      allowPrivilegeEscalation: false,
      capabilities: { drop: ["ALL"] },
    },
    volumeMounts: orchestratorCacheVolumeMounts(),
  }
}
