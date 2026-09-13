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
      statement: "A subagent's readings move onto its seat before that subagent's page goes.",
    },
    {
      invariantKind: "departure",
      statement: "A reading this file still holds when its page goes is taken away with that page.",
    },
    {
      invariantKind: "departure",
      statement: "A reading a seat kept comes back here as the page it was made under does.",
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
