import type { Module } from "../../code-system/modules/module.page-type.ts"

export const healthExport = {
  id: "01a05c14-b119-7001-b832-1c3d7e46c281",
  pageTypeSlug: "module",
  slug: "health-export",
  definition: "the Apple Health export read off the laptop, and the script fetching it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The export is read a line at a time rather than parsed as a single document.",
    },
    {
      invariantKind: "departure",
      statement: "A line that is no record is answered as nothing rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "An Apple date carries its own offset and is read as the instant that date names.",
    },
    {
      invariantKind: "departure",
      statement:
        "The script narrows the export to the metrics asked for before the export leaves the laptop.",
    },
  ],
} as const satisfies Module
