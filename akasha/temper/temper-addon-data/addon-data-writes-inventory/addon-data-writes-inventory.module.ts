import type { Module } from "@akasha/code-system/module"

export const addonDataWritesInventory = {
  id: "01a06837-d6c9-708e-ab60-6fbcfe933cbc",
  pageTypeSlug: "module",
  slug: "addon-data-writes-inventory",
  definition: "the inventory section of a run's output, as the writes the section stands for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every table the section renders lands under one destination.",
    },
    {
      invariantKind: "departure",
      statement: "A section states its writes rather than performing them.",
    },
  ],
} as const satisfies Module
