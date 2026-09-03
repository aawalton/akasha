import type { WorkstationService } from "../workstation-service.page-type.ts"

export const surplusFallNotifier = {
  id: "01a06829-0194-7754-b17a-14e66866bd98",
  pageTypeSlug: "workstation-service",
  slug: "surplus-fall-notifier",
  definition: "the service saying when the day has spent Alan's night down a rung",
  runs: ["bun services/surplus-fall-notifier.ts"],
  enabled: true,
  systemd: {
    restartDelaySeconds: 30,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "The day opens on what Alan slept, placed on the readout's own scale.",
    },
    {
      invariantKind: "departure",
      statement: "Every rung between where the day opened and where it stands is claimed.",
    },
    {
      invariantKind: "departure",
      statement:
        "What this writes is a notification, and reaching a device is the push notifier's.",
    },
    {
      invariantKind: "departure",
      statement: "The notification records what was said, so a rung is never announced twice.",
    },
    {
      invariantKind: "departure",
      statement: "Three thrown ticks in a row end the process on exit 1, which is not restarted.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The exit status that must prevent a restart stands nowhere the unit is written from.",
    },
    {
      invariantKind: "gap",
      statement: "The service runs.",
    },
  ],
} as const satisfies WorkstationService
