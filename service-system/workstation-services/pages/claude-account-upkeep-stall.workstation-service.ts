import type { WorkstationService } from "../workstation-service.page-type.ts"

export const claudeAccountUpkeepStall = {
  id: "01a06829-0194-773b-982b-dd8a10714450",
  pageTypeSlug: "workstation-service",
  slug: "claude-account-upkeep-stall",
  definition: "the service ruling on whether Claude account upkeep has stalled and telling Alan",
  runs: [
    "timeout 120 bun akasha/agents/claude-accounts/modules/account-upkeep-stall-reading/account-upkeep-stall-reading.module.code.ts --notify",
  ],
  enabled: true,
  systemd: {
    schedule: "*:0/30",
    catchUp: true,
    startTimeoutSeconds: 300,
  },
} as const satisfies WorkstationService
