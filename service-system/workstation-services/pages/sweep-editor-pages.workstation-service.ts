import type { WorkstationService } from "../workstation-service.page-type.ts"

export const sweepEditorPages = {
  id: "01a06829-0194-7950-8ac2-4d2088049ea0",
  pageTypeSlug: "workstation-service",
  slug: "sweep-editor-pages",
  definition: "the service removing every editor page whose window or terminal is gone",
  runs: [
    "bun akasha/alan/harness/code-editor/editor-page-sweeping/editor-page-sweeping.module.code.ts --remove",
  ],
  enabled: true,
  systemd: {
    schedule: "hourly",
    jitterSeconds: 300,
    startTimeoutSeconds: 120,
  },
} as const satisfies WorkstationService
