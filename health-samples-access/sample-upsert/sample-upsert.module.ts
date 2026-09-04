import type { Module } from "../../code-system/modules/module.page-type.ts"

export const sampleUpsert = {
  id: "01a05bc7-9129-7006-bbd4-12ab615a3223",
  pageTypeSlug: "module",
  slug: "sample-upsert",
  definition: "health readings landed on the ESO day each began in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading lands on the rows beside the ESO day its stretch began in.",
    },
    {
      invariantKind: "departure",
      statement: "Two readings naming the same span from the same source are one reading.",
    },
    {
      invariantKind: "departure",
      statement: "A reading already filed at that value is left untouched.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading whose value moved keeps the id and the seq that reading was filed under.",
    },
    {
      invariantKind: "departure",
      statement: "A reading landed carries the instant that reading arrived.",
    },
    {
      invariantKind: "departure",
      statement: "A write names the commit the rows were read at.",
    },
    {
      invariantKind: "departure",
      statement: "A write is refused where the rows file no longer holds what was read.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is written through the pages rather than onto a checkout.",
    },
    {
      invariantKind: "departure",
      statement: "A write that cannot be kept is refused rather than answered as done.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the ESO day page the rows sit beside.",
    },
    {
      invariantKind: "departure",
      statement: "The rows written land as a commit.",
    },
    {
      invariantKind: "departure",
      statement: "A write the pages refuse is tried again from a fresh read.",
    },
    {
      invariantKind: "departure",
      statement: "Five tries are made at the most.",
    },
    {
      invariantKind: "departure",
      statement: "A change meant that named no commit is refused rather than answered as done.",
    },
    {
      invariantKind: "departure",
      statement: "A write that never landed throws.",
    },
    {
      invariantKind: "departure",
      statement: "A day whose readings were all filed already is answered without a commit.",
    },
  ],
} as const satisfies Module
