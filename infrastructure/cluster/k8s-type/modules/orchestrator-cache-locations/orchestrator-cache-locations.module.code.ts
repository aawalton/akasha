export interface CacheLocation {
  readonly backing: "hostPath" | "emptyDir"
  readonly hostPath: string
  readonly hostPathType: "Directory" | "DirectoryOrCreate"
  readonly cloneOriginUrl: string
}

export const GIT_TRANSPORT_TOKEN = "GIT_ACCESS_TOKEN"

export const GIT_TRANSPORT_ORIGIN =
  "http://git-transport.git.svc.cluster.local:3000/alan/akasha.git"

const ASKED_FOR = `!f() { echo username=x-access-token; echo "password=$${GIT_TRANSPORT_TOKEN}"; }; f`

export const GIT_TRANSPORT_ASKING = [
  { name: "GIT_CONFIG_COUNT", value: "1" },
  { name: "GIT_CONFIG_KEY_0", value: "credential.helper" },
  { name: "GIT_CONFIG_VALUE_0", value: ASKED_FOR },
] as const

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
