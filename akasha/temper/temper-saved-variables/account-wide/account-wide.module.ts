import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const accountWide = {
  id: "01a06053-3636-700a-9f99-a7c1b8442ab7",
  pageTypeSlug: "module",
  slug: "account-wide",
  definition: "the part of a saved-variables table every character on one account shares",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account key begins with an at sign.",
    },
    {
      invariantKind: "departure",
      statement: "The first account carrying an account-wide table is taken.",
    },
    {
      invariantKind: "constraint",
      statement: "A key the schema does not name is carried through rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A file holding no account-wide table reads as nothing rather than as a failure.",
    },
  ],
} as const satisfies Module
