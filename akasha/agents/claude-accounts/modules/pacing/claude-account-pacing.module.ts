import type { Module } from "@akasha/code-system/module"

export const claudeAccountPacing = {
  id: "01a06318-c048-798d-9da5-8554d16da7cd",
  pageTypeSlug: "module",
  slug: "claude-account-pacing",
  definition: "how far ahead or behind a weekly quota an account is",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The seven-day quota is 144 hours rather than 168.",
    },
    {
      invariantKind: "departure",
      statement: "Sunday counts toward no part of the seven-day quota.",
    },
    {
      invariantKind: "departure",
      statement: "A Sunday is the day running from midnight to midnight in UTC.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seven-day window is seven times twenty-four hours rather than seven calendar days.",
    },
    {
      invariantKind: "departure",
      statement:
        "Elapsed time is measured to the end of the current eso-day rather than to the moment asked about.",
    },
    {
      invariantKind: "departure",
      statement: "A pace is answered at the granularity of a whole day.",
    },
    {
      invariantKind: "departure",
      statement:
        "The eso-day boundary is taken from the day package rather than worked out again here.",
    },
    {
      invariantKind: "departure",
      statement: "A five-hour window opened five hours before the moment that window resets.",
    },
    {
      invariantKind: "departure",
      statement: "A seven-day window opened seven days before the moment that window resets.",
    },
    {
      invariantKind: "departure",
      statement: "An account whose seven-day reset is unknown has 144 hours until that reset.",
    },
    {
      invariantKind: "departure",
      statement: "A seven-day reset already past answers 144 hours until that reset.",
    },
    {
      invariantKind: "departure",
      statement: "An account whose seven-day reset is unknown has elapsed the whole of its window.",
    },
    {
      invariantKind: "departure",
      statement: "Hours remaining never fall under a thousandth of an hour.",
    },
    {
      invariantKind: "departure",
      statement: "A burn rate is the fraction of the window left over the hours left.",
    },
    {
      invariantKind: "departure",
      statement: "A pace above zero is hours of quota in hand.",
    },
    {
      invariantKind: "departure",
      statement: "A pace is written with a sign and two decimal places.",
    },
    {
      invariantKind: "constraint",
      statement: "Every instant this module works from is handed in by the caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "gap",
      statement: "The Sunday left out is a UTC day while a pace is cut at a New York boundary.",
    },
    {
      invariantKind: "gap",
      statement:
        "The 144 answered for an unknown reset is below the hours a freshly opened window has left.",
    },
    {
      invariantKind: "gap",
      statement:
        "A pace exactly halfway between two hundredths is rounded toward the greater hundredth.",
    },
  ],
} as const satisfies Module
