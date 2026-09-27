import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const holdNaming = {
  id: "01a0e39f-7c8a-741c-a8b5-411387d68436",
  type: "page-type/module",
  slug: "hold-naming",
  definition: "what the thread that listens is doing, kept so a hold can name what held it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A route, a timer, a landing and each phase of a landing are marked as they run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is kept until the service starts watching for holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mark ending under a tenth of a second is let go at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each tick of the watch lets go the marks that ended before that tick.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hold is named by the marks that ended during the hold and the marks still running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Marks of the same name are said once, with how many and the longest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last sixteen landings are kept with the time each of their phases took.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing made on another thread is kept as that thread tells it, on this clock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A phase is kept on a landing only at or over the least time its mark names.",
    },
  ],
} as const satisfies Module
