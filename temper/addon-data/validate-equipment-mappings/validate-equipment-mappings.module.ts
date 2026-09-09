import type { Module } from "@akasha/code/module"

export const validateEquipmentMappings = {
  id: "01a06837-d6c9-764c-9c11-c54009827e36",
  pageTypeSlug: "module",
  slug: "validate-equipment-mappings",
  definition: "whether each committed index table still has one slot per id temper holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A table the file states nothing about is a failure rather than nothing to compare.",
    },
    {
      invariantKind: "departure",
      statement: "A file that is absent is a failure rather than four comparisons that all passed.",
    },
    {
      invariantKind: "departure",
      statement: "The file compared against is under the checkout the run walks.",
    },
    {
      invariantKind: "departure",
      statement: "A table is read out of the file's text rather than by loading the file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The number of slots a table has is compared rather than the ids that table names.",
    },
  ],
} as const satisfies Module
