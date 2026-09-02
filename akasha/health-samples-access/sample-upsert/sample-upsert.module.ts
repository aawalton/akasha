import type { Module } from "../../code-system/module/module.page-type.ts"

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
      statement: "The rows file is read and written under one lock held across the whole act.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is written only into the checkout said to keep what is written there.",
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
      invariantKind: "absence",
      statement: "Nothing here commits the rows written.",
    },
    {
      invariantKind: "gap",
      statement: "A reading nothing commits goes when the checkout holding that reading goes.",
    },
  ],
} as const satisfies Module
