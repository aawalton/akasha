import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Logs = "jsonl"

export const logs = {
  id: "01a08bdc-91a1-7741-9e53-895095f3712f",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "logs",
  propertySlug: "logs",
  definition: "the cost of each run of a group's code, appended a line at a time",
  generated: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A group's runs are recorded apart from every other group's runs.",
    },
    {
      invariantKind: "departure",
      statement: "Logs are kept outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "No page states its own logs.",
    },
  ],
} as const satisfies FileProperty
