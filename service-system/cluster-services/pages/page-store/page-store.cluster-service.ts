import type { ClusterService } from "../../cluster-service.page-type.ts"

export const pageStore = {
  id: "01a05aba-55cb-7696-8110-a428e8ffd3f2",
  pageTypeSlug: "cluster-service",
  slug: "page-store",
  definition: "the forwarder that carries a pod's page request to the workstation",
  resourceKind: "Deployment",
  namespace: "page-store",
  resourceName: "page-store",
  image: "alpine/socat:1.8.0.3",
  replicas: 1,
  containerPort: 8787,
  manifestCode:
    "service-system/cluster-services/pages/page-store/page-store.cluster-service.code.attachment.ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pages are held on a workstation and answered there.",
    },
    {
      invariantKind: "departure",
      statement:
        "What runs in the cluster carries a pod's request out to that workstation and the answer back.",
    },
    {
      invariantKind: "departure",
      statement: "The workstation is named by its private-network name rather than by an address.",
    },
    {
      invariantKind: "departure",
      statement: "The name holds when the address moves.",
    },
    {
      invariantKind: "departure",
      statement: "A pod reaches this by an ordinary cluster name on an ordinary port.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing calling this is configured with a proxy.",
    },
    {
      invariantKind: "departure",
      statement: "The carrying goes through the tailnet egress that already stands.",
    },
    {
      invariantKind: "departure",
      statement: "No second private-network node is enrolled for this.",
    },
    {
      invariantKind: "departure",
      statement:
        "Readiness is judged by asking the workstation a real question and reading the answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pod that is reached is one the whole path stands for rather than one that has bound a socket.",
    },
  ],
} as const satisfies ClusterService
