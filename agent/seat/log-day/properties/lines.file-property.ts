import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const lines = {
  id: "01a0657c-cb14-7d57-b8ba-4bd082337746",
  type: "page-type/file-property",
  slug: "lines",
  propertySlug: "lines",
  definition: "the console lines a source wrote for a seat on a day",
  extensions: ["jsonl"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one json object on one row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line has the instant the line was written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line has the agent id the writing process ran under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Lines past the most bytes one file may have roll into a numbered part beside that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first part beside a page is part2.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each further part takes the next number up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part no page names is read by nothing and swept by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lines are kept outside the commit.",
    },
  ],
  types: "ts",
  appendOnly: true,
} as const satisfies FileProperty
