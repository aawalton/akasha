import type { Module } from "../../code-system/modules/module.page-type.ts"

export const sampleRows = {
  id: "01a05bc7-9129-7003-ad69-0d84f3a9d2ea",
  pageTypeSlug: "module",
  slug: "sample-rows",
  definition: "a stored row read back as a health reading",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row naming a metric nobody knows is answered as nothing rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "A row whose value is no finite number is answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A value stored as text is read as the number the value spells.",
    },
    {
      invariantKind: "departure",
      statement: "A field the row does not hold reads as the empty string.",
    },
    {
      invariantKind: "departure",
      statement: "A row beside an akasha page spells its keys in camel.",
    },
  ],
} as const satisfies Module
