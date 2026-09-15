import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTypeGathering = {
  id: "01a07883-67ee-7be0-9fd1-0df7b1974d3e",
  type: "module",
  slug: "page-type-gathering",
  definition: "which pages stand as page types, read from the types those pages are",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type is a page of any type reaching `page-type` by extending.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The walk out from `page-type` repeats until no type joins.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The walk finds a type only after finding every type that type extends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller naming no types reads `page-type` alone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the properties a page type declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The types gathered from one reading are gathered once for that reading and held.",
    },
  ],
} as const satisfies Module
