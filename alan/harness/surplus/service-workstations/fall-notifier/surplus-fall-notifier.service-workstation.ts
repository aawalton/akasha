import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const surplusFallNotifier = {
  id: "01a06829-0194-7754-b17a-14e66866bd98",
  type: "page-type/service-workstation",
  slug: "surplus-fall-notifier",
  definition:
    "the service that writes a notification when today's surplus reaches a new tier under today's sleep",
  enabled: true,
  systemd: {
    restartDelaySeconds: 30,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The day opens on the sleep Alan got.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sleep Alan got is placed on the readout's own scale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every rung between where the day opened and where that day is now is claimed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This service writes only a notification.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reaching a device is the push notifier's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The notification records the rung announced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung is never announced twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Three thrown ticks in a row end the process on exit 1.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The process is not restarted after exit 1.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "The exit status that must prevent a restart exists nowhere the unit is written from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The service runs.",
    },
  ],
  createdAt: "2026-09-03T16:45:12.980Z",
  updatedAt: "2026-10-30T16:00:38.843Z",
} as const satisfies ServiceWorkstation
