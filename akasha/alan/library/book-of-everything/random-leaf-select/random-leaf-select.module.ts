import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const randomLeafSelect = {
  id: "01a06584-9bf3-7004-ad9f-38d1face4ec4",
  pageTypeSlug: "module",
  slug: "random-leaf-select",
  definition: "leaves narrowed by the status each carries, then drawn without replacement",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A draw asking for more than there are gives every one there is.",
    },
    {
      invariantKind: "departure",
      statement: "The source of randomness is handed in rather than reached for.",
    },
    {
      invariantKind: "departure",
      statement: "An index the randomness returns from outside its bound is refused.",
    },
  ],
} as const satisfies Module
