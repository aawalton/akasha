import { orchestratorCacheVolumeMounts } from "../orchestrator-cache-helpers/orchestrator-cache-helpers.module.code.ts"
import {
  BUN_RUNTIME_IMAGE,
  type CacheLocation,
  CONTAINER_TMP_PATH,
  ORCHESTRATOR_CACHE_MOUNT_PATH,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "../orchestrator-cache-locations/orchestrator-cache-locations.module.code.ts"

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

export function orchestratorCacheInitContainer(opts: {
  gitAccessTokenRef: GitAccessTokenRef
  location: CacheLocation
  memory?: string | { request: string; limit: string }
}): object {
  const memorySpec = resolveMemorySpec(opts.memory ?? "4Gi")
  const script = [
    "set -e",
    `mkdir -p ${ORCHESTRATOR_CACHE_MOUNT_PATH}`,
    `LOCK="${ORCHESTRATOR_CACHE_MOUNT_PATH}/.init-lock"`,
    'touch "$LOCK"',
    "(",
    "  attempts=0",
    "  until flock -n 9; do",
    "    attempts=$((attempts+1))",
    '    if [ "$attempts" -ge 60 ]; then',
    '      echo "init-code: timed out waiting for lock after ${attempts}s" >&2',
    "      exit 1",
    "    fi",
    "    sleep 1",
    "  done",
    `  rm -f ${ORCHESTRATOR_CACHE_REPO_PATH}/.git/index.lock`,
    `  if git -C ${ORCHESTRATOR_CACHE_REPO_PATH} rev-parse HEAD >/dev/null 2>&1; then`,
    `    WANT=$(printf %s "${opts.location.cloneOriginUrl}" | sed "s|^.*@||")`,
    `    HAVE=$(git -C ${ORCHESTRATOR_CACHE_REPO_PATH} config --get remote.origin.url 2>/dev/null | sed "s|^.*@||")`,
    `    if [ "$HAVE" != "$WANT" ]; then`,
    `      echo "init-code: origin is $HAVE but this pod is for $WANT — repointing"`,
    `      git -C ${ORCHESTRATOR_CACHE_REPO_PATH} remote set-url origin "${opts.location.cloneOriginUrl}"`,
    `    fi`,
    `    echo "init-code: ${ORCHESTRATOR_CACHE_REPO_PATH} already cloned, fetching origin and resetting to origin/main"`,
    `    git -C ${ORCHESTRATOR_CACHE_REPO_PATH} fetch origin --prune`,
    `    git -C ${ORCHESTRATOR_CACHE_REPO_PATH} reset --hard origin/main`,
    `    echo "init-code: source-sync to origin/main complete"`,
    "  else",
    `    if [ -e ${ORCHESTRATOR_CACHE_REPO_PATH} ]; then`,
    `      echo "init-code: ${ORCHESTRATOR_CACHE_REPO_PATH} exists but HEAD is unreadable — wiping partial state"`,
    `      rm -rf ${ORCHESTRATOR_CACHE_REPO_PATH}`,
    "    fi",
    `    echo "init-code: cloning monorepo into ${ORCHESTRATOR_CACHE_REPO_PATH}"`,
    `    git clone --branch main "${opts.location.cloneOriginUrl}" ${ORCHESTRATOR_CACHE_REPO_PATH}`,
    `    echo "init-code: clone complete"`,
    "  fi",
    `  echo "init-code: running bun install --frozen-lockfile"`,
    `  cd ${ORCHESTRATOR_CACHE_REPO_PATH} && bun install --frozen-lockfile`,
    `  echo "init-code: bun install complete"`,
    ') 9>"$LOCK"',
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
