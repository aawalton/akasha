import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const k8sType = {
  id: "01a06735-dd9c-700c-89ca-ed7f38cab9b1",
  type: "page-type/domain",
  slug: "k8s-type",
  definition: "the types writing a Kubernetes manifest",
  parts: [
    "module/cdk8s-synth",
    "module/config-checksum",
    "module/hostnames",
    "module/hostnames-ci-enrollment",
    "module/k8s-namespace",
    "module/k8s-web-service",
    "module/labels",
    "module/manifest-composing",
    "module/orchestrator-cache",
    "module/orchestrator-cache-helpers",
    "module/orchestrator-cache-locations",
    "module/secret-checksum",
    "page-type/manifest",
  ],
} as const satisfies Domain
