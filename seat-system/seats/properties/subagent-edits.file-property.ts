import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type SubagentEdits = "jsonl"

export const subagentEdits = {
  id: "01a08d62-417b-781b-9088-442ac476d7ae",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "subagent-edits",
  propertySlug: "subagent-edits",
  definition: "the edits a subagent under a seat had not landed when its page went",
  extensions: ["jsonl"],
  runsFileLength: false,
  generated: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line has one edit, as a line beside an agent's own page has.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's page going appends the edits that subagent had not landed.",
    },
    {
      invariantKind: "departure",
      statement: "An edit already landed is beside no page, so an edit here was never landed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The seat reaches an edit here that the subagent answering it can no longer reach.",
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
} as const satisfies FileProperty
