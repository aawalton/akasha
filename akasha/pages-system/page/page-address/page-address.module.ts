import type { Module } from "../../../code-system/module/module.page-type.ts"

export const pageAddress = {
  id: "01a04b14-4355-7352-9c98-ad67e309f5f6",
  pageTypeSlug: "module",
  slug: "page-address",
  definition: "what form a relation value takes when it names a page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This says what form an address takes and looks no page up.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type and a slug are cut at the first `/`, and a slug may carry later ones.",
    },
    {
      invariantKind: "departure",
      statement:
        "This module imports nothing, so everything resolving an address can reach it without a cycle.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The lower uuid shape stands here a second time, because reaching the format that owns it would be an import.",
    },
  ],
} as const satisfies Module
