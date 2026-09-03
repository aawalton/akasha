import type { FileProperty } from "@akasha/pages-system/file-property"

export type Data = "json"

export const data = {
  id: "01a0675d-04be-72a0-82d2-910e3f2f80d3",
  pageTypeSlug: "file-property",
  slug: "data",
  propertySlug: "data",
  definition: "the bytes one whole reading was written as",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A data file is kept byte for byte as the capture handed the bytes over.",
    },
    {
      invariantKind: "departure",
      statement: "A data file holds one whole JSON document rather than a piece of one.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pieces a reading arrived in are rejoined in chunk index order before landing.",
    },
    {
      invariantKind: "departure",
      statement: "A reading whose pieces rejoin to no JSON document carries no data file.",
    },
    {
      invariantKind: "stopgap",
      statement: "A data file holds raw bytes that no page has yet been written for.",
    },
    {
      invariantKind: "stopgap",
      statement: "The rows a data file carries are being modelled as the reading's own entries.",
    },
    {
      invariantKind: "stopgap",
      statement: "A data file goes once those entries are proved to carry its rows.",
    },
    {
      invariantKind: "stopgap",
      statement: "The transport's division is not carried into akasha with the bytes it divided.",
    },
  ],
} as const satisfies FileProperty
