import type { Module } from "@akasha/code-system/module"

export const addonDataWritesEquipment = {
  id: "01a06837-d6c9-74ca-91b9-4e771dc5a29b",
  pageTypeSlug: "module",
  slug: "addon-data-writes-equipment",
  definition: "the equipment section of a run's output, as the writes the section stands for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every equipment table is rendered from the rows of the page type holding it.",
    },
    {
      invariantKind: "departure",
      statement: "A destination takes more than one of the section's tables.",
    },
    {
      invariantKind: "departure",
      statement: "A section states its writes rather than performing them.",
    },
  ],
} as const satisfies Module
