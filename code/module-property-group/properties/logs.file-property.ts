import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const logs = {
  id: "01a08bdc-91a1-7741-9e53-895095f3712f",
  type: "page-type/file-property",
  slug: "logs",
  propertySlug: "logs",
  definition: "the cost of each run of a group's code, appended a line at a time",
  extensions: ["jsonl"],
  generated: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A group's runs are recorded apart from every other group's runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Logs are kept outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No page states its own logs.",
    },
  ],
  types: "ts",
  keptForHours: 24,
} as const satisfies FileProperty
