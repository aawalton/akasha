import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const writeDailyPoints = {
  id: "01a06972-ba1c-7000-a663-259b73593e24",
  type: "page-type/module",
  slug: "write-daily-points",
  definition: "a recomputed reading, landed on its own day",
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
  createdAt: "2026-09-03T22:45:21.564Z",
  updatedAt: "2026-09-22T13:57:00.000Z",
} as const satisfies Module
