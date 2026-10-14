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
        "registry.registry.svc.cluster.local:5000/cluster/temper-addons:72d86edb3e1a82c322acb19438897e81dc6171d238f47427be62a1c244d91d21",
      copyFrom: "/bundle",
      copyTo: "temper/web/addons",
      copiedFiles: ["temper-addons.zip", "version.txt"],
      copyEnv: "ADDONS_BUNDLE_DIR",
      sourceHash: "b1c45b70d740672353cbaf058a2bd406e8b49cfea5b216495f7786657b854ce0",
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
  updatedAt: "2026-10-14T19:12:40.885Z",
  createdAt: "2026-09-01T04:07:55.830Z",
} as const satisfies ServiceCluster
