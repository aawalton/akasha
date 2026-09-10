import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const importLines = {
  id: "01a08cda-348f-7c87-89fb-04be4a6a3124",
  pageTypeSlug: "module",
  type: "module",
  slug: "import-lines",
  definition: "the import lines a body carries, read and written as text",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every name an import line names is answered with the path it comes from.",
    },
    {
      invariantKind: "departure",
      statement: "A name is answered as a type where its line or its own entry says type.",
    },
    {
      invariantKind: "departure",
      statement: "A name spelled as a key rather than reached is not among the names a node names.",
    },
    {
      invariantKind: "departure",
      statement: "A name imported under another name is answered by the name at its source.",
    },
    {
      invariantKind: "departure",
      statement: "A name taken out of a line leaves the other names that line carries.",
    },
    {
      invariantKind: "departure",
      statement: "The anchor a body offers is the last import line that body holds.",
    },
    {
      invariantKind: "departure",
      statement: "A body holding no import line offers no anchor.",
    },
    {
      invariantKind: "departure",
      statement: "A line put into a body follows the anchor that body offers.",
    },
    {
      invariantKind: "departure",
      statement: "A line opening a body with no anchor is parted from that body by a blank line.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides which lines a body should carry.",
    },
  ],
} as const satisfies Module
