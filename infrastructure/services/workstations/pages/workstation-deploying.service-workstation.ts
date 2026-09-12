import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const workstationDeploying = {
  id: "01a09593-7b82-7c95-a865-8a7bfa7f269d",
  type: "service-workstation",
  slug: "workstation-deploying",
  definition:
    "the service putting the workstation kind up once a commit changes what it is built from",
  runs: [
    "bun infrastructure/services/deploy-looping/deploy-looping.module.code.ts service-workstation",
  ],
  enabled: true,
  systemd: {
    schedule: "*:*:00",
    jitterSeconds: 10,
    startTimeoutSeconds: 600,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "One kind is put up by this service, and that kind is named in its run.",
    },
    {
      invariantKind: "departure",
      statement: "A tick starts a deploy and ends, rather than waiting for that deploy.",
    },
    {
      invariantKind: "departure",
      statement:
        "The deploy runs in a scope of its own, so this service being started again leaves it running.",
    },
    {
      invariantKind: "departure",
      statement:
        "The deploy this starts puts this service up too, and starts it again where it changed.",
    },
    {
      invariantKind: "departure",
      statement: "A tick finding nothing changed starts nothing, so that is no loop without end.",
    },
  ],
} as const satisfies ServiceWorkstation
