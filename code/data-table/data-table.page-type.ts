import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const dataTable = {
  id: "01a0c946-b6a1-7375-926b-b5d5111118d0",
  type: "page-type/page-type",
  slug: "data-table",
  definition: "a table of data a generator writes",
  pluralSlug: "modules",
  parts: ["code-file-property/data-table-code"],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "code-file-property/data-table-code", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A data table holds its whole table in one file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A data table's file is held to no byte ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The place an entry has in a table is that entry's index on the wire.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dividing a table again moves those places and nothing fails.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A data table is gathered under `modules`, where the tables already sit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A data table extends `domain` rather than `module`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Extending `module` would leave two properties at the key `code`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan approved this page type in the turn that asked for it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
