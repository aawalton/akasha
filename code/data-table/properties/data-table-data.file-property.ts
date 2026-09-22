import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const dataTableData = {
  id: "01a0cac3-0af1-75bc-918f-6270451170de",
  type: "page-type/file-property",
  slug: "data-table-data",
  propertySlug: "data",
  definition: "the data a data table is, in the format a reader parses rather than compiles",
  extensions: ["json"],
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A data table's data is held to no byte ceiling.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A table this wide costs a compiler on every run where the table is code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table nothing compiles is data rather than code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table more than one language reads is data rather than code.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A settle writes the file of a property saying it is generated, and no change does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A command writes this file from what it read, so this property says no such thing.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
