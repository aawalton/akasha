import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const mechanicRuns = {
  id: "01a0c4b7-02d8-76e0-a14b-978b3d05eb61",
  type: "page-type/file-property",
  slug: "mechanic-runs",
  propertySlug: "mechanic-runs",
  definition: "every mechanic a game has run, what it was handed and what it answered",
  extensions: ["jsonl"],
  appendOnly: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row names the mechanic that ran rather than the rules that were in force.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row holds what the mechanic was handed, so running it again answers the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row carried over from an older shape has no row before it to follow.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No row holds a copy of the rules, the commit holding those.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
