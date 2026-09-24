import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const cronDue = {
  id: "01a0d4b4-b69a-73e8-b2c7-7aea0751a777",
  type: "page-type/module",
  slug: "cron-due",
  definition: "the last minute a cron schedule named at or before a given moment",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A schedule is five fields: minute, hour, day of the month, month and weekday.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A field is a star, a number, a range or a list of these, each with a step or none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weekday of seven is Sunday, as a weekday of nought is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A schedule restricting both the day of the month and the weekday is due on a day matching either.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A schedule is read in UTC, the clock the cluster runs its schedules on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A schedule that will not parse is due at no moment rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A schedule due nowhere in the year before the moment given is due at no moment.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock.",
    },
  ],
} as const satisfies Module
