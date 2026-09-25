import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const subagentEdits = {
  id: "01a08d62-417b-781b-9088-442ac476d7ae",
  type: "page-type/file-property",
  slug: "subagent-edits",
  propertySlug: "subagent-edits",
  definition: "the edits a seat keeps from a subagent that has no page",
  extensions: ["jsonl"],
  runsFileLength: false,
  generated: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line has one edit, as a line beside an agent's own page has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent's page going appends the edits that subagent had not landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edit already landed is beside no page, so an edit here was never landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The seat reaches an edit here that the subagent answering it can no longer reach.",
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
