import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const turnUndoAnswering = {
  id: "01a0f1ca-3316-79ad-8946-c58f07e6f30e",
  type: "page-type/service-workstation",
  slug: "turn-undo-answering",
  definition: "the service undoing the latest turns players ask to have undone",
  enabled: true,
  needsSecrets: false,
  systemd: {
    restart: "on-failure",
    restartDelaySeconds: 5,
    startLimitIntervalSeconds: 0,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The unit running the watch is simple rather than a timer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run turns the undo answering module's own watch rather than a watch written again.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The service runs on the workstation, since the checkout a cancel lands in is there.",
    },
  ],
} as const satisfies ServiceWorkstation
