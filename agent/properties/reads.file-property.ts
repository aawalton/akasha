import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

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
      invariantKind: "invariant-kind/departure",
      statement: "One line has one reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading is appended rather than written over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file is written again only to forget readings.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The last line naming a path is that path's reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file names the agent, so no line does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent's readings move onto its seat before that subagent's page goes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading this file still holds when its page goes is taken away with that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading a seat kept comes back here as the page it was made under does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
