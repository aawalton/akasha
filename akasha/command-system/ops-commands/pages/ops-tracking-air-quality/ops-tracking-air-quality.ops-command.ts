import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingAirQuality = {
  id: "01a06904-524f-7608-9c62-da2d464f8aec",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-air-quality",
  definition:
    "the current air reading for a location, and the outdoor-exertion verdict drawn from it.",
  opsPath: "tracking air-quality",
  opsEntryFile: "tools/commands/tracking/air-quality.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
