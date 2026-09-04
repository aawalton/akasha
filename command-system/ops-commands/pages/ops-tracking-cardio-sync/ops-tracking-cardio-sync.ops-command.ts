import type { OpsCommand } from "../../ops-command.page-type.ts"

export const opsTrackingCardioSync = {
  id: "01a06904-5250-784f-853a-19959e18fd2f",
  pageTypeSlug: "ops-command",
  slug: "ops-tracking-cardio-sync",
  definition:
    "rewriting one day's active calories from the health samples standing against its waking hours.",
  opsPath: "tracking cardio-sync",
  opsEntryFile: "akasha/alan/tracking/daily/cardio-sync/cardio-sync.module.code.ts",
  opsHelp: "txt",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A day the samples say nothing about is left as it was rather than written to zero.",
    },
  ],
} as const satisfies OpsCommand
