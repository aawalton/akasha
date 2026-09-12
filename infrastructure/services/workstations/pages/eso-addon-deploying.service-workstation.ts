import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const esoAddonDeploying = {
  id: "01a095be-957a-70aa-93ff-0845e49c8f73",
  type: "service-workstation",
  slug: "eso-addon-deploying",
  definition:
    "the service putting the ESO addon kind up once a commit changes what it is built from",
  enabled: true,
  systemd: {
    schedule: "*:*:00",
    jitterSeconds: 10,
    startTimeoutSeconds: 600,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "One kind is put up by this service, and the code beside this page names that kind.",
    },
    {
      invariantKind: "departure",
      statement: "An addon is compiled and placed where the game reads it, and nothing else.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick with every addon up to date puts nothing up, so that is no loop without end.",
    },
  ],
} as const satisfies ServiceWorkstation
