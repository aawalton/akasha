import type { Module } from "../../../../code-system/modules/module.page-type.types.ts"

export const signInForm = {
  id: "01a08e25-b176-7b8a-a831-12be30fc3c71",
  pageTypeSlug: "module",
  type: "module",
  slug: "sign-in-form",
  definition: "the form a reader signs in through",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reader signed in goes to the target the url asked for or to the root.",
    },
    {
      invariantKind: "constraint",
      statement: "Only a host named here is a target the url may ask for.",
    },
  ],
} as const satisfies Module
