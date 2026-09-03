import type { Module } from "@akasha/code-system/module"

export const exerciseSaying = {
  id: "01a0685d-b7ab-7b6c-a4d6-28e8b556428d",
  pageTypeSlug: "module",
  slug: "exercise-saying",
  definition: "what an exercise command was told on the command line and how it answers",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A word the command does not take is a refusal rather than a word ignored.",
    },
    {
      invariantKind: "departure",
      statement: "A flag taking a value with no value after it is a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A flag said twice that takes one value is a refusal rather than a last word won.",
    },
    {
      invariantKind: "departure",
      statement: "A flag that may repeat holds every value said, in the order said.",
    },
    {
      invariantKind: "departure",
      statement: "Every refusal a call earns is gathered before any of them is answered.",
    },
    {
      invariantKind: "departure",
      statement: "A day is read as four digits, two digits and two digits, parted by dashes.",
    },
    {
      invariantKind: "departure",
      statement: "A day left unsaid is the ESO logical day the call was made on.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page or writes one.",
    },
  ],
} as const satisfies Module
