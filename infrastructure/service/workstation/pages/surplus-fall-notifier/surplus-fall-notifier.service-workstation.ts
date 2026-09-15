import type { ServiceWorkstation } from "akasha/infrastructure/service/workstation/service-workstation.page-type.types.ts"

export const surplusFallNotifier = {
  id: "01a06829-0194-7754-b17a-14e66866bd98",
  type: "page-type/service-workstation",
  slug: "surplus-fall-notifier",
  definition: "the service saying when the day has spent Alan's night down a rung",
  enabled: true,
  systemd: {
    restartDelaySeconds: 30,
  },
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day opens on the sleep Alan got.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The sleep Alan got is placed on the readout's own scale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every rung between where the day opened and where that day is now is claimed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This service writes only a notification.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Reaching a device is the push notifier's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The notification records the rung announced.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rung is never announced twice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Three thrown ticks in a row end the process on exit 1.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The process is not restarted after exit 1.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement:
        "The exit status that must prevent a restart exists nowhere the unit is written from.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The service runs.",
    },
  ],
} as const satisfies ServiceWorkstation
