export interface CacheLocation {
  readonly backing: "hostPath" | "emptyDir"
  readonly hostPath: string
  readonly hostPathType: "Directory" | "DirectoryOrCreate"
  readonly cloneOriginUrl: string
}

export const GIT_TRANSPORT_CACHE: CacheLocation = {
  backing: "emptyDir",
  hostPath: "/mnt/git-transport-cache",
  hostPathType: "DirectoryOrCreate",
  cloneOriginUrl: "/data/git/repositories/alan/akasha.git",
} as const

export const ALANWALTON_WEB_CACHE: CacheLocation = {
  backing: "hostPath",
  hostPath: "/var/alanwalton-web-cache",
  hostPathType: "DirectoryOrCreate",
  cloneOriginUrl:
    "http://x-access-token:${GIT_ACCESS_TOKEN}@git-transport.git.svc.cluster.local:3000/alan/akasha.git",
} as const

export const ARCHIVE_OF_WORLDS_WEB_CACHE: CacheLocation = {
  backing: "hostPath",
  hostPath: "/var/archive-of-worlds-web-cache",
  hostPathType: "DirectoryOrCreate",
  cloneOriginUrl:
    "http://x-access-token:${GIT_ACCESS_TOKEN}@git-transport.git.svc.cluster.local:3000/alan/akasha.git",
} as const

export const AUDHDALAN_WEB_CACHE: CacheLocation = {
  backing: "hostPath",
  hostPath: "/var/audhdalan-web-cache",
  hostPathType: "DirectoryOrCreate",
  cloneOriginUrl:
    "http://x-access-token:${GIT_ACCESS_TOKEN}@git-transport.git.svc.cluster.local:3000/alan/akasha.git",
} as const

export const TEMPER_WEB_CACHE: CacheLocation = {
  backing: "hostPath",
  hostPath: "/var/temper-web-cache",
  hostPathType: "DirectoryOrCreate",
  cloneOriginUrl:
    "http://x-access-token:${GIT_ACCESS_TOKEN}@git-transport.git.svc.cluster.local:3000/alan/akasha.git",
} as const

export const SMILINGJENNY_WEB_CACHE: CacheLocation = {
  backing: "hostPath",
  hostPath: "/var/smilingjenny-web-cache",
  hostPathType: "DirectoryOrCreate",
  cloneOriginUrl:
    "http://x-access-token:${GIT_ACCESS_TOKEN}@git-transport.git.svc.cluster.local:3000/alan/akasha.git",
} as const

export const ATLAS_WEB_CACHE: CacheLocation = {
  backing: "hostPath",
  hostPath: "/var/atlas-web-cache",
  hostPathType: "DirectoryOrCreate",
  cloneOriginUrl:
    "http://x-access-token:${GIT_ACCESS_TOKEN}@git-transport.git.svc.cluster.local:3000/alan/akasha.git",
} as const

export const ORCHESTRATOR_CACHE_MOUNT_PATH = "/app"

export const ORCHESTRATOR_CACHE_REPO_PATH = "/app/repo"

export const CONTAINER_TMP_VOLUME = "tmp"

export const CONTAINER_TMP_PATH = `/${CONTAINER_TMP_VOLUME}`

export const BUN_RUNTIME_IMAGE = "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest"
