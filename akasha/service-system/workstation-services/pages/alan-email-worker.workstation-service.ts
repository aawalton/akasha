import type { WorkstationService } from "../workstation-service.page-type.ts"

export const alanEmailWorker = {
  id: "01a06829-0193-7263-a1e4-d14db047d74d",
  pageTypeSlug: "workstation-service",
  slug: "alan-email-worker",
  definition: "the service deciding Alan's mail against his email rules",
  runs: ["bun services/email-watch.ts"],
  enabled: true,
  systemd: {
    restartDelaySeconds: 10,
  },
} as const satisfies WorkstationService
