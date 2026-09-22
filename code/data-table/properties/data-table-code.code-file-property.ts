import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const dataTableCode = {
  id: "01a0c946-d9cf-7224-8be1-0a9e8e6dc563",
  type: "page-type/code-file-property",
  slug: "data-table-code",
  propertySlug: "code",
  definition: "the code a data table is",
  extensions: ["ts"],
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A data table's code is held to no byte ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table wider than that ceiling is held whole rather than divided.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module's `code` is told from this one by the page type in the file name.",
    },
  ],
  types: "ts",
} as const satisfies CodeFileProperty
