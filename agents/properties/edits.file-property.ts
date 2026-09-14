import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const edits = {
  id: "01a07771-c8a1-7ef9-b931-04ce8f6bbc85",
  type: "file-property",
  slug: "edits",
  propertySlug: "edits",
  definition: "the edits an agent has answered and not yet landed",
  extensions: ["jsonl"],
  runsFileLength: false,
  generated: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One line has one edit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change appends its lines rather than rewriting the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line rolls into the next numbered file where the ceiling is reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line states one edit of the four kinds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line has the paths and bodies that edit names and nothing else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line holds whether the readers of that path owe the reading again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line with nothing there leaves those readers owing the reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The lines are folded into one answer before that answer is replayed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The lines are read in the order the lines were appended.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
