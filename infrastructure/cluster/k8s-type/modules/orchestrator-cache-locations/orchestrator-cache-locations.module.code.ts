export interface CacheLocation {
  readonly backing: "hostPath" | "emptyDir"
  readonly hostPath: string
  readonly hostPathType: "Directory" | "DirectoryOrCreate"
  readonly cloneOriginUrl: string
}

export const GIT_TRANSPORT_CLONE_URL =
  "http://x-access-token:${GIT_ACCESS_TOKEN}@git-transport.git.svc.cluster.local:3000/alan/akasha.git"

export const GIT_TRANSPORT_CACHE: CacheLocation = {
  backing: "emptyDir",
  hostPath: "/mnt/git-transport-cache",
  hostPathType: "DirectoryOrCreate",
  cloneOriginUrl: "/data/git/repositories/alan/akasha.git",
} as const

export const ORCHESTRATOR_CACHE_MOUNT_PATH = "/app"

export const ORCHESTRATOR_CACHE_REPO_PATH = "/app/repo"

export const CONTAINER_TMP_VOLUME = "tmp"

export const CONTAINER_TMP_PATH = `/${CONTAINER_TMP_VOLUME}`

export const BUN_RUNTIME_IMAGE = "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest"
