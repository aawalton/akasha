import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const temperAddonDeploying = {
  id: "01a095be-957a-70aa-93ff-0845e49c8f73",
  type: "page-type/service-workstation",
  slug: "temper-addon-deploying",
  definition: "the service putting the temper addon kind up once a commit changes its source",
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
} as const satisfies ServiceWorkstation
