import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingStrengthSync = {
  id: "01a06904-525a-7b0d-951d-36609276eea1",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-strength-sync",
  definition: "rewriting one day's strength volume from the workouts recorded against it.",
  opsPath: "tracking strength-sync",
  opsEntryFile: "akasha/alan/tracking/daily/strength-sync/strength-sync.module.code.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
