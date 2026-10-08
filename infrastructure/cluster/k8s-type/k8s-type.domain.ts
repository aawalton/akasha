import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const k8sType = {
  id: "01a06735-dd9c-700c-89ca-ed7f38cab9b1",
  type: "page-type/domain",
  slug: "k8s-type",
  definition: "the types a manifest for Kubernetes is written with",
  parts: [
    "module/cdk8s-synth",
    "module/config-checksum",
    "module/container-resources",
    "module/hostnames",
    "module/hostnames-ci-enrollment",
    "module/k8s-namespace",
    "module/labels",
    "module/manifest-composing",
    "module/orchestrator-cache",
    "module/orchestrator-cache-helpers",
    "module/orchestrator-cache-locations",
    "module/secret-checksum",
    "page-type/manifest",
  ],
  createdAt: "2026-09-03T12:19:38.524Z",
  updatedAt: "2026-09-26T01:03:30.000Z",
} as const satisfies Domain
