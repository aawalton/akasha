import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const writeDailyPoints = {
  id: "01a06972-ba1c-7000-a663-259b73593e24",
  type: "page-type/module",
  slug: "write-daily-points",
  definition: "a recomputed reading, landed on the day it is a reading of",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading the day already carries is answered unchanged rather than landed again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading answered unchanged is an outcome rather than a reading that failed.",
    },
  ],
} as const satisfies Module
