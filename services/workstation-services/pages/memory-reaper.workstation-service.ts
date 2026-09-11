import type { WorkstationService } from "../workstation-service.page-type.types.ts"

export const memoryReaper = {
  id: "01a06829-0194-7550-9679-6801bad16b9f",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "memory-reaper",
  definition: "the service killing an agent tree when the workstation runs short of memory",
  runs: [
    "bun seat-system/memory-reaping/memory-reaper-running/memory-reaper-running.module.code.ts",
  ],
  starts: [{ code: "module/memory-reaper-running" }],
  enabled: true,
  systemd: {
    restartDelaySeconds: 5,
  },
} as const satisfies WorkstationService
