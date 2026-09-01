import type { Module } from "@akasha/code-system/module"

export const deleting = {
  id: "01a05bd6-c52b-7e05-aaba-3dcff1a42826",
  pageTypeSlug: "module",
  slug: "deleting",
  definition: "a page taken away",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A removal takes the page's file rather than raising a flag on it.",
    },
  ],
} as const satisfies Module
