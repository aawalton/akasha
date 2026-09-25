import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const subagentRefusals = {
  id: "01a08d62-5be7-74d0-8fa3-63a8fc24f035",
  type: "page-type/file-property",
  slug: "subagent-refusals",
  propertySlug: "subagent-refusals",
  definition: "the refusals a seat keeps from a subagent that has no page",
  extensions: ["txt"],
  runsFileLength: false,
  generated: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A subagent's own file here says the last landing that subagent tried was refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent's page going appends what that file said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The subagent whose refusal it was opens the passage appended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One blank line parts two refusals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file is kept outside the commit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
