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
        "registry.registry.svc.cluster.local:5000/cluster/temper-addons:a332f4ea91a4723cd6c9677817ffee6b0649444f834dc1e7d862defb1d1e7d9e",
      copyFrom: "/bundle",
      copyTo: "temper/web/addons",
      copiedFiles: ["temper-addons.zip", "version.txt"],
      copyEnv: "ADDONS_BUNDLE_DIR",
      sourceHash: "6fb372c3ef0ee2249fc9b8bd34469fca7d55e9c0e9b1a2b9fa05ad7f5797b745",
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
  updatedAt: "2026-10-14T18:06:09.554Z",
  createdAt: "2026-09-01T04:07:55.830Z",
} as const satisfies ServiceCluster
