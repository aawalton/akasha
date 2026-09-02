import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const savedVariablesAccessor = {
  id: "01a06071-0c79-73ce-a434-c3b18ac668a1",
  pageTypeSlug: "module",
  slug: "saved-variables-accessor",
  definition: "the one way code inside the catalog add-on reaches the saved catalog table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The add-on's own start-up sets the accessor before any collector runs.",
    },
    {
      invariantKind: "departure",
      statement: "Reaching the saved table before start-up throws.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
