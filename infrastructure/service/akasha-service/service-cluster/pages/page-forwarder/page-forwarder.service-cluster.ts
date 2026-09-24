import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const pageForwarder = {
  id: "01a05aba-55cb-7696-8110-a428e8ffd3f2",
  type: "page-type/service-cluster",
  slug: "page-forwarder",
  definition: "the forwarder that carries a pod's page request to the workstation",
  resourceKind: "Deployment",
  namespace: "page-forwarder",
  resourceName: "page-forwarder",
  image: "alpine/socat:1.8.0.3",
  replicas: 1,
  containerPort: 8787,
  manifest: ["manifest/page-forwarder"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages are held on a workstation and answered there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The forwarder in the cluster carries a pod's request out to that workstation and the answer back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The workstation is named by its private-network name rather than by an address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name holds when the address moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pod reaches this service by an ordinary cluster name on an ordinary port.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing calling this service is configured with a proxy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The carrying goes through the tailnet egress that already exists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No second private-network node is enrolled for this service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Readiness is judged by asking the workstation a real question and reading the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pod that is reached is a pod the whole path represents rather than a pod that has bound a socket.",
    },
  ],
} as const satisfies ServiceCluster
