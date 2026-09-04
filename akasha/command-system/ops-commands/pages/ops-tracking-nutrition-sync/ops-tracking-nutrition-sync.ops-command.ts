import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingNutritionSync = {
  id: "01a06904-5255-7738-b0bf-0cae4031db0f",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-nutrition-sync",
  definition: "rewriting one day's nutrition figure from the food rows logged against it.",
  opsPath: "tracking nutrition-sync",
  opsEntryFile: "akasha/alan/tracking/daily/nutrition-sync/nutrition-sync.module.code.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
