import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const workstationDeploying = {
  id: "01a09593-7b82-7c95-a865-8a7bfa7f269d",
  type: "page-type/service-workstation",
  slug: "workstation-deploying",
  definition: "the service putting the workstation kind up once a commit changes the kind's source",
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
      statement:
        "A tick ends once the deploy it started ends, and the tick after it is skipped meanwhile.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The deploy runs in a scope of its own, so this service being started again leaves it running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The deploy this starts puts this service up too, and starts it again where it changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick finding nothing changed starts nothing, so that is no loop without end.",
    },
  ],
} as const satisfies ServiceWorkstation
