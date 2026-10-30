import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const temperAddonDeploying = {
  id: "01a095be-957a-70aa-93ff-0845e49c8f73",
  type: "page-type/service-workstation",
  slug: "temper-addon-deploying",
  definition:
    "the service putting a Temper addon up once a commit changes what that addon is built from",
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
      statement: "An addon is compiled and placed where the game reads it, and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tick with every addon up to date puts nothing up, so that is no loop without end.",
    },
  ],
  createdAt: "2026-09-12T13:11:30.426Z",
  updatedAt: "2026-10-30T16:15:10.049Z",
} as const satisfies ServiceWorkstation
