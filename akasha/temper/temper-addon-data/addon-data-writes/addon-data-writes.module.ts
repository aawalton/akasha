import type { Module } from "@akasha/code-system/module"

export const addonDataWrites = {
  id: "01a06837-d6c9-74ea-9631-13d87daaabd1",
  pageTypeSlug: "module",
  slug: "addon-data-writes",
  definition: "every write a run of the addon data generator makes, gathered as named sections",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run's writes are one table of named sections rather than one flat list.",
    },
    {
      invariantKind: "departure",
      statement: "A section that throws while being built names itself rather than failing alone.",
    },
    {
      invariantKind: "departure",
      statement: "A section that throws while being built stops no other section from being built.",
    },
    {
      invariantKind: "departure",
      statement: "A section is handed how to write rather than writing to disk itself.",
    },
    {
      invariantKind: "departure",
      statement: "Writing to disk is what a caller naming no way to write is given.",
    },
  ],
} as const satisfies Module
