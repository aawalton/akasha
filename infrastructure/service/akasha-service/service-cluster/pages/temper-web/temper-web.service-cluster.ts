import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const temperWeb = {
  id: "01a05b26-f8b6-7b51-a3bf-3c4d1128e7e8",
  type: "page-type/service-cluster",
  slug: "temper-web",
  definition: "what serves the parts of Temper that run in a browser",
  resourceKind: "Deployment",
  namespace: "temper",
  resourceName: "web",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  probePath: "/api/watcher/version",
  workloadClass: "serve",
  runtimeEnv: [
    { name: "PAGE_WRITER", value: "temper-web" },
    { name: "BASE_URL", value: "https://tempereso.com" },
  ],
  minCpuMillicores: 100,
  maxCpuMillicores: 500,
  minMemoryMb: 512,
  killMemoryMb: 512,
  codeSync: { cachePath: "/var/temper-web-cache", minMemoryMb: 256, killMemoryMb: 4096 },
  imageCopies: [
    {
      image: "registry.registry.svc.cluster.local:5000/cluster/temper-watcher:latest",
      copyFrom: "/build",
      copyTo: "temper/web/watcher",
      copiedFiles: ["temper-watcher.exe", "temper-watcher-worker.exe", "version.txt"],
      copyEnv: "WATCHER_DIR",
    },
    {
      image:
        "registry.registry.svc.cluster.local:5000/cluster/temper-addons:dc9925b9f10d0a5f3a25eb83f6d9c6ab943059a5e1f8ac3ac299a329b6df1173",
      copyFrom: "/bundle",
      copyTo: "temper/web/addons",
      copiedFiles: ["temper-addons.zip", "version.txt"],
      copyEnv: "ADDONS_BUNDLE_DIR",
      sourceHash: "be0de9f71bb28b0e3087dea45b9b8d152c772043b3f9a92bb9b0b8d4f004bb16",
    },
  ],
  manifests: "yaml",
  secrets: [
    "secret/alanwalton-secrets-google-oauth-client-id",
    "secret/alanwalton-secrets-google-oauth-client-secret",
    "secret/alanwalton-secrets-handover-public-key",
    "secret/git-transport-secrets-git-access-token",
    "secret/temper-secrets-session-key",
  ],
} as const satisfies ServiceCluster
