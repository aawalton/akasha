import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pageHref = {
  id: "01a05c13-a261-7c66-b6d7-f8bd74caf905",
  type: "module",
  slug: "page-href",
  definition: "the address one page is reached at, built from its slug and its id and read back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is written as a link carrying that address and that page's title.",
    },
    {
      invariantKind: "departure",
      statement: "A page with no id is written as no link rather than as a link to nowhere.",
    },
  ],
} as const satisfies Module
