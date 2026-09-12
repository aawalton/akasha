import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const subagentRefusals = {
  id: "01a08d62-5be7-74d0-8fa3-63a8fc24f035",
  type: "file-property",
  slug: "subagent-refusals",
  propertySlug: "subagent-refusals",
  definition: "why the last landing a subagent under a seat tried was refused",
  extensions: ["txt"],
  runsFileLength: false,
  generated: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A subagent's own file here says the last landing that subagent tried was refused.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's page going appends what that file said.",
    },
    {
      invariantKind: "departure",
      statement: "The subagent whose refusal it was opens the passage appended.",
    },
    {
      invariantKind: "departure",
      statement: "One blank line parts two refusals.",
    },
    {
      invariantKind: "departure",
      statement: "The file is kept outside the commit.",
    },
    {
      invariantKind: "absence",
      statement: "No author writes a line here by hand.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
