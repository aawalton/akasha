import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const beatChanges = {
  id: "01a10256-8b7b-76f4-a26e-8fdd6ef11563",
  type: "page-type/file-property",
  slug: "beat-changes",
  propertySlug: "beat-changes",
  definition:
    "the mechanics step's part of each beat: the numbers and items it changes, one to a line",
  extensions: ["jsonl"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one change, as one json object naming its beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master's advance empties this file, so a rerun starts it again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The move to player writes each change onto the page keeping it.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
