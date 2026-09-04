import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const backfillTurns = {
  id: "01a05b71-e543-755f-8fd1-ab8e2e5074d5",
  pageTypeSlug: "module",
  slug: "backfill-turns",
  definition:
    "turns rebuilt out of a game's raw beat log, one per turn number, each under the chapter it fell in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only narrative beats count toward a turn's text.",
    },
    {
      invariantKind: "departure",
      statement: "Beats sharing a turn number are joined in the order the log holds those beats.",
    },
    {
      invariantKind: "departure",
      statement: "A turn number asked for that the log has nothing under is reported as skipped.",
    },
  ],
} as const satisfies Module
