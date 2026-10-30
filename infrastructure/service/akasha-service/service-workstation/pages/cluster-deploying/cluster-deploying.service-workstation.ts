import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const clusterDeploying = {
  id: "01a095f5-2a3a-7cc4-a6d7-44beac4bc49a",
  type: "page-type/service-workstation",
  slug: "cluster-deploying",
  definition:
    "the service putting a cluster service up once a commit changes what that service is built from",
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
  createdAt: "2026-09-12T14:11:07.450Z",
  updatedAt: "2026-10-30T16:13:00.822Z",
} as const satisfies ServiceWorkstation
