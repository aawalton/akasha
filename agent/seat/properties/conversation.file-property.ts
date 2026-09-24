import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const conversation = {
  id: "01a0d431-f57d-78ea-9552-bed3c2712e6a",
  type: "page-type/file-property",
  slug: "conversation",
  propertySlug: "conversation",
  definition: "what was said in a seat since its last compaction, one entry to a line",
  extensions: ["jsonl"],
  runsFileLength: false,
  generated: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line has one entry as the conversation shaping shapes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This file is written again from the seat's transcript as that transcript grows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
