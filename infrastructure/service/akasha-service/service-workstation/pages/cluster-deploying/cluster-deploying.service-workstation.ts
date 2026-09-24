import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const clusterDeploying = {
  id: "01a095f5-2a3a-7cc4-a6d7-44beac4bc49a",
  type: "page-type/service-workstation",
  slug: "cluster-deploying",
  definition: "the service putting the cluster kind up once a commit changes the kind's source",
  enabled: true,
  systemd: {
    schedule: "*:*:00",
    jitterSeconds: 10,
    startTimeoutSeconds: 3900,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One kind is put up by this service, and the code beside this page names that kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster deploy applies the manifests a page states, and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tick with every cluster service up to date puts nothing up, so that is no loop without end.",
    },
  ],
} as const satisfies ServiceWorkstation
