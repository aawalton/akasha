import type { WorkstationService } from "../workstation-service.page-type.types.ts"

export const surplusFallNotifier = {
  id: "01a06829-0194-7754-b17a-14e66866bd98",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "surplus-fall-notifier",
  definition: "the service saying when the day has spent Alan's night down a rung",
  runs: ["bun alan/harness/surplus/fall-notifying/surplus-fall-notifying.module.code.ts"],
  enabled: true,
  systemd: {
    restartDelaySeconds: 30,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "The day opens on the sleep Alan got.",
    },
    {
      invariantKind: "departure",
      statement: "The sleep Alan got is placed on the readout's own scale.",
    },
    {
      invariantKind: "departure",
      statement: "Every rung between where the day opened and where that day is now is claimed.",
    },
    {
      invariantKind: "departure",
      statement: "This service writes only a notification.",
    },
    {
      invariantKind: "departure",
      statement: "Reaching a device is the push notifier's.",
    },
    {
      invariantKind: "departure",
      statement: "The notification records the rung announced.",
    },
    {
      invariantKind: "departure",
      statement: "A rung is never announced twice.",
    },
    {
      invariantKind: "departure",
      statement: "Three thrown ticks in a row end the process on exit 1.",
    },
    {
      invariantKind: "departure",
      statement: "The process is not restarted after exit 1.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The exit status that must prevent a restart exists nowhere the unit is written from.",
    },
    {
      invariantKind: "gap",
      statement: "The service runs.",
    },
  ],
} as const satisfies WorkstationService
