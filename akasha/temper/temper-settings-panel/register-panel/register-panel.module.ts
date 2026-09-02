import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const registerPanel = {
  id: "01a06053-3637-713f-ab1c-3a21aa26e1e0",
  pageTypeSlug: "module",
  slug: "register-panel",
  definition: "an add-on's panel and its options handed to the add-on menu library",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A panel is registered before its options are.",
    },
    {
      invariantKind: "departure",
      statement: "The control the library hands back is passed straight through.",
    },
    {
      invariantKind: "departure",
      statement: "The library's own types are left to the caller to name.",
    },
  ],
} as const satisfies Module
