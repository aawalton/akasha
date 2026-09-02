import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const domainKeys = {
  id: "01a06071-0c79-7e98-87f3-f277a3b41182",
  pageTypeSlug: "module",
  slug: "domain-keys",
  definition: "the key each catalog domain is saved under, held to the payload's own fields",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The key list is checked against the payload where the compiler runs.",
    },
    {
      invariantKind: "departure",
      statement: "A metadata field of the payload is named by no key here.",
    },
    {
      invariantKind: "departure",
      statement: "A key here is a field of the payload of the same name.",
    },
  ],
} as const satisfies Module
