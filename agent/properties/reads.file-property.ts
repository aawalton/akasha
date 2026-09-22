import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const reads = {
  id: "01a09c31-c3c6-74f8-9064-94c903e1ba85",
  type: "page-type/file-property",
  slug: "reads",
  propertySlug: "reads",
  definition: "the bodies an agent has read, a line for each reading",
  extensions: ["jsonl"],
  runsFileLength: false,
  generated: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line has one reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is appended rather than written over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file is written again only to forget readings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last line naming a path is that path's reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file names the agent, so no line does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent's readings move onto its seat before that subagent's page goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading this file still holds when its page goes is taken away with that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading a seat kept comes back here as the page it was made under does.",
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
