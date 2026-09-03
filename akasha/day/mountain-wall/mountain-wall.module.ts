import type { Module } from "../../code-system/modules/module.page-type.ts"

export const mountainWall = {
  id: "01a06848-a27e-756a-aff3-a0c8f31695cb",
  pageTypeSlug: "module",
  slug: "mountain-wall",
  definition: "the instant a Mountain wall time names, and the time a Mountain clock reads at one",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A wall time is resolved against the offset the candidate instant lands in.",
    },
    {
      invariantKind: "departure",
      statement: "A time said with a date is that Mountain wall time on that date.",
    },
    {
      invariantKind: "departure",
      statement: "A timestamp closing in Z or in an offset is the instant it states.",
    },
    {
      invariantKind: "departure",
      statement: "Seconds a caller writes are kept.",
    },
    {
      invariantKind: "departure",
      statement: "An instant is handed back as UTC.",
    },
    {
      invariantKind: "departure",
      statement: "A wall time whose hour is 1 to 12 is read on a twelve hour clock.",
    },
    {
      invariantKind: "departure",
      statement: "A wall time whose hour is 0 or 13 to 23 is read on a twenty-four hour clock.",
    },
    {
      invariantKind: "departure",
      statement:
        "A twelve hour reading answers to an instant and to the instant twelve hours away.",
    },
    {
      invariantKind: "departure",
      statement: "A twenty-four hour reading answers to an instant a day.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is looked for from one hour after now back as far as it repeats in.",
    },
    {
      invariantKind: "departure",
      statement: "The earliest instant a window reaches falls outside that window.",
    },
    {
      invariantKind: "departure",
      statement: "The latest instant a window reaches falls inside that window.",
    },
    {
      invariantKind: "departure",
      statement: "A window no clock turned inside holds one reading.",
    },
    {
      invariantKind: "constraint",
      statement: "A twelve hour window on the spring turn day can hold two readings.",
    },
    {
      invariantKind: "constraint",
      statement: "A twelve hour window on the autumn turn day can hold no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A window holding more than one reading is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A window holding no reading is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A wall time the clock skipped is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A wall time the clock struck twice is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal asks for the date and the time to be said instead.",
    },
    {
      invariantKind: "departure",
      statement: "A day the calendar does not hold is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An hour past 23 or a minute past 59 is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A time that will not read is handed back as a refusal.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here throws.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "departure",
      statement: "Now is handed in.",
    },
    {
      invariantKind: "absence",
      statement: "No clock but Denver's is read here.",
    },
  ],
} as const satisfies Module
