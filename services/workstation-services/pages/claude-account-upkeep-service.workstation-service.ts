import type { WorkstationService } from "../workstation-service.page-type.ts"

export const claudeAccountUpkeepService = {
  id: "01a06829-0194-744a-b8fe-cd24f9fcdcc1",
  pageTypeSlug: "workstation-service",
  slug: "claude-account-upkeep-service",
  definition: "the service renewing each Claude account's token and reading its usage every hour",
  runs: [
    "bun agents/claude-accounts/modules/account-upkeep-running/account-upkeep-running.module.code.ts",
  ],
  enabled: true,
  systemd: {
    restartDelaySeconds: 10,
  },
} as const satisfies WorkstationService
