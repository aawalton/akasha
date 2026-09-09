import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayOpening = {
  id: "01a069c3-a82a-798b-b746-3c9dfa4f21fc",
  pageTypeSlug: "module",
  slug: "day-opening",
  definition: "which day an instant falls in, counted from the moment Alan's day opens",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The moment a day opened is read from the opening window rather than worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "An instant before its ESO day opened counts to the day before.",
    },
    {
      invariantKind: "departure",
      statement: "An instant at or after the next day's opening counts to the day after.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a sleep block.",
    },
    {
      invariantKind: "gap",
      statement: "A day that will not parse answers a window at the epoch rather than refusing.",
    },
  ],
  test: "ts",
} as const satisfies Module
