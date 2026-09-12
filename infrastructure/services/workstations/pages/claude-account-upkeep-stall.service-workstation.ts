import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const claudeAccountUpkeepStall = {
  id: "01a06829-0194-773b-982b-dd8a10714450",
  type: "service-workstation",
  slug: "claude-account-upkeep-stall",
  definition: "the service ruling on whether Claude account upkeep has stalled and telling Alan",
  runs: [
    "bun agents/claude-accounts/modules/account-upkeep-stall-reading/account-upkeep-stall-reading.module.code.ts --notify",
  ],
  starts: [{ code: "module/account-upkeep-stall-reading", arguments: ["--notify"] }],
  enabled: true,
  systemd: {
    schedule: "*:0/30",
    catchUp: true,
    startTimeoutSeconds: 120,
  },
} as const satisfies ServiceWorkstation
