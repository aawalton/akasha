import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const setVolume = {
  id: "01a0683a-6e1b-79cc-b4df-f1c84b721fc3",
  pageTypeSlug: "module",
  slug: "set-volume",
  definition: "what one set of work is worth and what a session's sets come to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A set is worth the load it moves once for each rep.",
    },
    {
      invariantKind: "departure",
      statement: "The load a set moves counts the weight once for each implement held.",
    },
    {
      invariantKind: "departure",
      statement: "The load a set moves counts the share of the bodyweight the exercise carries.",
    },
    {
      invariantKind: "departure",
      statement: "A warmup set is worth nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A set of any activity other than strength is worth nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A set stating no activity is strength.",
    },
    {
      invariantKind: "departure",
      statement: "A session's volume is rounded where a set's volume is not.",
    },
    {
      invariantKind: "stopgap",
      statement: "A field the set states nothing for counts as nought rather than refusing.",
    },
  ],
} as const satisfies Module
