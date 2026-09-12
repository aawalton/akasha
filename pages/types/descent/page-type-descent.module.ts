import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const pageTypeDescent = {
  id: "01a04eca-11d6-7481-9151-c390edc031c2",
  type: "module",
  slug: "page-type-descent",
  definition: "which page types are under a given page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Descent is read from the types each page type's own value names as above it.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is under itself.",
    },
    {
      invariantKind: "departure",
      statement: "Every page type is under `page`, so that descent is every page type filed.",
    },
    {
      invariantKind: "departure",
      statement: "A page type reaching no parent it names is under no other page type.",
    },
    {
      invariantKind: "departure",
      statement: "A caller with the index as its change leaves that index is answered from that.",
    },
    {
      invariantKind: "departure",
      statement: "A caller names the reading and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "A slug two page types carry is under every type either names.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here walks the pages.",
    },
    {
      invariantKind: "departure",
      statement: "A world writing its own index is answered before that index has any relation.",
    },
  ],
} as const satisfies Module
