import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const reads = {
  id: "01a09c31-c3c6-74f8-9064-94c903e1ba85",
  type: "file-property",
  slug: "reads",
  propertySlug: "reads",
  definition: "the bodies an agent has read, one line for each reading",
  extensions: ["jsonl"],
  runsFileLength: false,
  generated: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line has one reading.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is appended rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "The file is written again only to forget readings.",
    },
    {
      invariantKind: "departure",
      statement: "The last line naming a path is that path's reading.",
    },
    {
      invariantKind: "departure",
      statement: "The file names the agent, so no line does.",
    },
    {
      invariantKind: "departure",
      statement: "The readings of an agent whose page goes go with that page.",
    },
    {
      invariantKind: "departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      invariantKind: "absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
