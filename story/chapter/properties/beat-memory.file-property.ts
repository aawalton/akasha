import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const beatMemory = {
  id: "01a10289-e311-7082-a03e-488b0a0e0bef",
  type: "page-type/file-property",
  slug: "beat-memory",
  propertySlug: "beat-memory",
  definition:
    "the recorders' part of each beat: who learns which fact, and what the reader is shown",
  extensions: ["jsonl"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one memory, as one json object naming its beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master's advance empties this file, so a rerun starts it again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The move to player adds each learner to the knowers of the fact learned.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
