import type { Module } from "@akasha/code/module"

export const addonDataWritesAlchemy = {
  id: "01a06837-d6c9-78da-823e-e34e8aa19133",
  pageTypeSlug: "module",
  slug: "addon-data-writes-alchemy",
  definition: "the alchemy section of a run's output, as the writes the section represents",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The restore metrics are rendered from the item sweep's rows rather than from a page type's rows.",
    },
    {
      invariantKind: "departure",
      statement: "A section states its writes rather than performing a write.",
    },
  ],
} as const satisfies Module
