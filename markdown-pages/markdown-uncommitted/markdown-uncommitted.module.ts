import type { Module } from "@akasha/code-system/module"

export const markdownUncommitted = {
  id: "01a06895-1cfd-7000-aa5e-74b77ffc881d",
  pageTypeSlug: "module",
  slug: "markdown-uncommitted",
  definition: "the values held beside a markdown page before they are committed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An uncommitted file is written whole under an exclusive hold.",
    },
  ],
} as const satisfies Module
