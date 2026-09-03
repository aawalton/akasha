import type { FileProperty } from "@akasha/pages-system/file-property"

export type Lines = "jsonl"

export const lines = {
  id: "01a0657c-cb14-7d57-b8ba-4bd082337746",
  pageTypeSlug: "file-property",
  slug: "lines",
  propertySlug: "lines",
  definition: "the console lines a source wrote for one seat on one day",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line is one json object on one row.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the instant the line was written.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the agent id the writing process ran under.",
    },
    {
      invariantKind: "departure",
      statement: "Lines past the most bytes one file may hold roll into a numbered part beside it.",
    },
    {
      invariantKind: "departure",
      statement: "The first part beside a page is part2.",
    },
    {
      invariantKind: "departure",
      statement: "Each further part takes the next number up.",
    },
    {
      invariantKind: "departure",
      statement: "A part no page names is read by nothing and swept by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Lines are kept outside the commit.",
    },
  ],
} as const satisfies FileProperty
