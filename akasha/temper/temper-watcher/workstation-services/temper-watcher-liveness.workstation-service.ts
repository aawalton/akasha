import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const temperWatcherLiveness = {
  id: "01a06039-9c8b-7215-b64f-bcf20ed1ca39",
  pageTypeSlug: "workstation-service",
  slug: "temper-watcher-liveness",
  definition: "the service saying when the temper watcher has stopped carrying anything across",
  runs: ["bun akasha/temper/temper-watcher/watcher-liveness/watcher-liveness.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:*:00",
    catchUp: true,
    startTimeoutSeconds: 120,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "The watcher is judged from outside the watcher.",
    },
    {
      invariantKind: "departure",
      statement: "A tick runs every minute.",
    },
  ],
} as const satisfies WorkstationService
