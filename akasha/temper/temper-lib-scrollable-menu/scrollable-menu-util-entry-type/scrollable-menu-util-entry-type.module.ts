import type { Module } from "@akasha/code-system/module"

export const scrollableMenuUtilEntryType = {
  id: "01a06275-c449-7779-ae6a-8ae87ffc8f8b",
  pageTypeSlug: "module",
  slug: "scrollable-menu-util-entry-type",
  definition: "the resolution of an entry type from the entry flags, name and additional data",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A divider is recognised from the entry name matching the divider string.",
    },
    {
      invariantKind: "departure",
      statement: "The resolved type is written back onto the entry along with each boolean flag.",
    },
    {
      invariantKind: "constraint",
      statement: "An explicitly supplied entry type is returned untouched.",
    },
    {
      invariantKind: "departure",
      statement:
        "Entry values given as functions are stored in a callback subtable and re-run later.",
    },
  ],
} as const satisfies Module
