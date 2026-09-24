import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"

export const keepSeatConversations = {
  id: "01a0d433-9895-7cc6-b301-bb9eceb6b3e6",
  type: "page-type/service-workstation",
  slug: "keep-seat-conversations",
  definition:
    "the service keeping each seat's conversation beside the seat as its transcript grows",
  enabled: true,
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
      statement: "Repeated starts are counted over no window.",
    },
  ],
} as const satisfies ServiceWorkstation
