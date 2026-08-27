import {
  type CacheLocation,
  ORCHESTRATOR_CACHE_MOUNT_PATH,
  ORCHESTRATOR_CACHE_REPO_PATH,
} from "./orchestrator-cache-locations"

export function orchestratorCacheVolumes(location: CacheLocation): readonly object[] {
  const cacheVolume =
    location.backing === "emptyDir"
      ? { name: "orchestrator-cache", emptyDir: {} }
      : {
          name: "orchestrator-cache",
          hostPath: { path: location.hostPath, type: location.hostPathType },
        }
  return [
    cacheVolume,
    {
      name: "tmp",
      emptyDir: { sizeLimit: "1Gi" },
    },
  ] as const
}

export function orchestratorCacheVolumeMounts(): readonly object[] {
  return [
    { name: "orchestrator-cache", mountPath: ORCHESTRATOR_CACHE_MOUNT_PATH },
    { name: "tmp", mountPath: "/tmp" },
  ] as const
}

export function orchestratorCacheEntrypointPath(workspaceRelative: string): string {
  return `${ORCHESTRATOR_CACHE_REPO_PATH}/${workspaceRelative}`
}
