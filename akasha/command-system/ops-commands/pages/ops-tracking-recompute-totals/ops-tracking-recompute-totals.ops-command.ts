import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingRecomputeTotals = {
  id: "01a06904-5256-770c-bb4f-1c0b44621084",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-recompute-totals",
  definition: "rewriting each Health persona's lifetime total, forward-only unless forced.",
  opsPath: "tracking recompute-totals",
  opsEntryFile: "tools/commands/tracking/recompute-totals.ts",
  opsHelp: "txt",
} as const satisfies OpsCommand
