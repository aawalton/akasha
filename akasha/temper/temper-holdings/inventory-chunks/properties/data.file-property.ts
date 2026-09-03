import type { FileProperty } from "@akasha/pages-system/file-property"

export type Data = "json"

export const data = {
  id: "01a0675d-04be-72a0-82d2-910e3f2f80d3",
  pageTypeSlug: "file-property",
  slug: "data",
  propertySlug: "data",
  definition: "the bytes one piece of a reading was written as",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A data file is kept byte for byte as the capture handed the bytes over.",
    },
    {
      invariantKind: "departure",
      statement: "A data file holds a piece of a JSON document rather than a whole one.",
    },
    {
      invariantKind: "departure",
      statement: "The byte count a reading is divided on is the transport's rather than akasha's.",
    },
    {
      invariantKind: "stopgap",
      statement: "A data file holds raw bytes that no page has yet been written for.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The rows a data file carries are being modelled as the reading's `stacks` entries.",
    },
    {
      invariantKind: "stopgap",
      statement: "A data file goes once those entries are proved to carry its rows.",
    },
    {
      invariantKind: "stopgap",
      statement: "The transport's division goes with the data files it divided.",
    },
  ],
} as const satisfies FileProperty
