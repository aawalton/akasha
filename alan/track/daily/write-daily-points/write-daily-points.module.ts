import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const writeDailyPoints = {
  id: "01a06972-ba1c-7000-a663-259b73593e24",
  pageTypeSlug: "module",
  type: "module",
  slug: "write-daily-points",
  definition: "one recomputed reading, landed on the day it is a reading of",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A reading the day already carries is answered unchanged rather than landed again.",
    },
    {
      invariantKind: "departure",
      statement: "A reading answered unchanged is an outcome rather than a reading that failed.",
    },
  ],
} as const satisfies Module
