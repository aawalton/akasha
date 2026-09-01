import type { Module } from "../../code-system/module/module.page-type.ts"

export const sampleUpsert = {
  id: "01a05bc7-9129-7006-bbd4-12ab615a3223",
  pageTypeSlug: "module",
  slug: "sample-upsert",
  definition: "health readings landed on the ESO day each began in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This raises rather than reporting that nothing was written.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page type nothing lands under.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says how many readings were lost.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a page.",
    },
    {
      invariantKind: "gap",
      statement: "A health reading is a page akasha carries.",
    },
  ],
} as const satisfies Module
