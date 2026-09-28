import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const phaseTimings = {
  id: "01a0e952-1ea6-79fa-b4d7-28dd0ee05374",
  type: "page-type/file-property",
  slug: "phase-timings",
  propertySlug: "phase-timings",
  definition:
    "how long each phase of a story's turns or chapters took, a line appended as one ends",
  extensions: ["jsonl"],
  generated: true,
  appendOnly: true,
  keptForHours: 720,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line names the phase, the run it was part of and the seat that ended it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is kept thirty days, so a week of turns can be read back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line read back out of git history says it was backfilled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Phase timings are kept outside the commit.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
