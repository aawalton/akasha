import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const healthExport = {
  id: "01a05c14-b119-7001-b832-1c3d7e46c281",
  type: "page-type/module",
  slug: "health-export",
  definition: "the Apple Health export read off the laptop, and the script fetching it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The export is read a line at a time rather than parsed as a single document.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line that is no record is answered as nothing rather than throwing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An Apple date has its own offset and is taken as the instant that date names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The script narrows the export to the metrics asked for before the export leaves the laptop.",
    },
  ],
} as const satisfies Module
