import type { Domain } from "../../../domains/domain.page-type.ts"

export const k8sTypes = {
  id: "01a06735-dd9c-700c-89ca-ed7f38cab9b1",
  pageTypeSlug: "domain",
  slug: "k8s-types",
  definition: "the types a Kubernetes manifest is written from",
  parts: [
    "module/cdk8s-synth",
    "module/hostnames",
    "module/hostnames-ci-enrollment",
    "module/k8s-container-probes",
    "module/k8s-manifest-node-targeting",
    "module/k8s-manifest-scanner",
    "module/k8s-manifest-walker",
    "module/labels",
    "module/orchestrator-cache",
    "module/orchestrator-cache-helpers",
    "module/orchestrator-cache-locations",
    "module/secret-checksum",
    "page-type/manifest",
    "module/k8s-namespace",
    "module/manifest-composing",
  ],
} as const satisfies Domain
