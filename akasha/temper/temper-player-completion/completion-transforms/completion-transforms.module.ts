import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionTransforms = {
  id: "01a06358-4f7c-7639-ad48-31e91421605e",
  pageTypeSlug: "module",
  slug: "completion-transforms",
  definition: "one reading of a character roster, gathering the per-character tallies beside it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The trait research catalog arrives as an argument and is handed straight on.",
    },
    {
      invariantKind: "constraint",
      statement: "A character read only for roster fields is left out of the tallies.",
    },
    {
      invariantKind: "departure",
      statement: "The roster size counts an unmeasured row beside a measured one.",
    },
    {
      invariantKind: "departure",
      statement: "A storage pet the account holds raises the bag size a pack upgrade is read from.",
    },
    {
      invariantKind: "departure",
      statement: "A pack upgrade count is held between zero and the most a bag admits.",
    },
    {
      invariantKind: "departure",
      statement: "A character of no measured level is given a maximum level of zero.",
    },
  ],
} as const satisfies Module
