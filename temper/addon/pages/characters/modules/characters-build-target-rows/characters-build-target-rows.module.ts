import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersBuildTargetRows = {
  id: "01a19939-85ab-73d9-889d-39007bd6f67f",
  type: "page-type/module",
  slug: "characters-build-target-rows",
  definition: "the lines and buttons the target build panel is drawn from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A section's title is in title case, with its count of met lines at the right edge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section with a line still to do is gold, and a section met is green.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line unmet is plain and indented one step under its section.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A button is a blue line of text that lights as it is pointed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the lines run out of room, the last one says how many more are unmet.",
    },
  ],
  createdAt: "2026-11-01T22:27:26.250Z",
  updatedAt: "2026-11-01T23:31:26.227Z",
} as const satisfies Module
