import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAccountPacing = {
  id: "01a06318-c048-798d-9da5-8554d16da7cd",
  type: "page-type/module",
  slug: "model-account-pacing",
  definition: "how far ahead or behind a weekly quota an account is",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The seven-day quota is 144 hours rather than 168.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sunday counts toward no part of the seven-day quota.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Sunday is the eso-day dated Sunday.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seven-day window is seven times twenty-four hours rather than seven calendar days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Elapsed time is measured to the end of the current eso-day rather than to the moment asked about.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pace is answered at the granularity of a whole day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The eso-day boundary is taken from the day package rather than worked out again here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A five-hour window opened five hours before the moment that window resets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seven-day window opened seven days before the moment that window resets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account whose seven-day reset is unknown has 168 hours until that reset.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seven-day reset already past answers 168 hours until that reset.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account whose seven-day reset is unknown has elapsed the whole of its window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Hours remaining never fall under a thousandth of an hour.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A burn rate is the fraction of the window left over the hours left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pace above zero is hours of quota in hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pace is written with a sign and two decimal places.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every instant this module works from is handed in by the caller.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads an index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here fetches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Sunday left out opens and closes at the New York boundary a pace's day does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unknown reset answers the hours a freshly opened window has left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pace exactly halfway between two hundredths is rounded toward the greater hundredth.",
    },
  ],
} as const satisfies Module
