import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayOpening = {
  id: "01a069c3-a82a-798b-b746-3c9dfa4f21fc",
  type: "page-type/module",
  slug: "day-opening",
  definition: "which day an instant falls in, counted from the moment Alan's day opens",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The moment a day opened is read from the opening window rather than worked out here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An instant before its ESO day's recorded opening counts to the day before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An instant at or after the next day's recorded opening counts to the day after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an opening read from a sleep block moves an instant off its ESO day.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No hour on a clock moves an instant off its ESO day.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a sleep block.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window that refuses and a window that falls back to the ESO day are two calls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller counting a figure a day page stores takes the window that refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The call that falls back throws on a day that will not parse, naming that day.",
    },
  ],
  test: "ts",
} as const satisfies Module
