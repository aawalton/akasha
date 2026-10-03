import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const coverRerolling = {
  id: "01a0e853-50d7-72fe-a224-748adb47cde2",
  type: "page-type/service-workstation",
  slug: "cover-rerolling",
  definition: "the service drawing again the story pictures readers ask to have drawn again",
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
      statement: "A run turns the rerolling module's own watch rather than a watch written again.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The service runs on the workstation, since the picture service answers only there.",
    },
  ],
} as const satisfies ServiceWorkstation
