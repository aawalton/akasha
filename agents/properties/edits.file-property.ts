import type { FileProperty } from "@akasha/pages/file-property"

export type Edits = "jsonl"

export const edits = {
  id: "01a07771-c8a1-7ef9-b931-04ce8f6bbc85",
  pageTypeSlug: "file-property",
  slug: "edits",
  propertySlug: "edits",
  definition: "the edits an agent has answered and not yet landed",
  runsFileLength: false,
  generated: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line has one edit.",
    },
    {
      invariantKind: "departure",
      statement: "A change appends its lines rather than rewriting the file.",
    },
    {
      invariantKind: "departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A line rolls into the next numbered file where the ceiling is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A line states one edit of the four kinds.",
    },
    {
      invariantKind: "departure",
      statement: "A line has the paths and bodies that edit names and no others.",
    },
    {
      invariantKind: "departure",
      statement: "A line holds whether the readers of that path owe the reading again.",
    },
    {
      invariantKind: "departure",
      statement: "A line with nothing there leaves those readers owing the reading.",
    },
    {
      invariantKind: "departure",
      statement: "The lines are folded into one answer before a patch is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "The lines are read in the order the lines were appended.",
    },
    {
      invariantKind: "absence",
      statement: "No author writes a line here by hand.",
    },
  ],
} as const satisfies FileProperty
