import type { WorkstationService } from "@akasha/service-system/workstation-service"

export const temperWatcher = {
  id: "01a06039-9c8b-7942-a8fc-234055602831",
  pageTypeSlug: "workstation-service",
  slug: "temper-watcher",
  definition: "the service carrying what Alan does in the game across to the web",
  runs: ["bun akasha/temper/temper-watcher/watcher-running/watcher-running.module.code.ts"],
  enabled: true,
  systemd: {
    restart: "on-failure",
    restartDelaySeconds: 5,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "The worker is held in the foreground.",
    },
    {
      invariantKind: "departure",
      statement: "The unit running the worker is a simple one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change to the worker reaches the workstation on a restart rather than on a deploy.",
    },
  ],
} as const satisfies WorkstationService
