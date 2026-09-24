import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const authProxyManifests = {
  id: "01a07383-6af4-7b2a-9679-bdc53aceb125",
  type: "page-type/manifest",
  slug: "auth-proxy-manifests",
  definition: "the namespace, the deployment reading a request's session and the way in to it",
  code: "ts",
  minCpuMillicores: 50,
  maxCpuMillicores: 500,
  minMemoryMb: 2048,
  killMemoryMb: 2048,
  generatedDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A contributor admitted here is written out rather than read from that person's page.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A page this code imports is copied into the image, and its index churns.",
    },
  ],
} as const satisfies Manifest
