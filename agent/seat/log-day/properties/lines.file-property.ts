import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const lines = {
  id: "01a0657c-cb14-7d57-b8ba-4bd082337746",
  type: "file-property",
  slug: "lines",
  propertySlug: "lines",
  definition: "the console lines a source wrote for one seat on one day",
  extensions: ["jsonl"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One line is one json object on one row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line has the instant the line was written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line has the agent id the writing process ran under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Lines past the most bytes one file may have roll into a numbered part beside that file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first part beside a page is part2.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each further part takes the next number up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part no page names is read by nothing and swept by nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Lines are kept outside the commit.",
    },
  ],
  types: "ts",
  appendOnly: true,
} as const satisfies FileProperty
