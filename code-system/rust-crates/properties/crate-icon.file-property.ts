import type { FileProperty } from "@akasha/pages-system/file-property"

export type CrateIcon = "json"

export const crateIcon = {
  id: "01a0693a-5bbe-7c76-b5ef-d2e85fbec62f",
  pageTypeSlug: "file-property",
  slug: "crate-icon",
  propertySlug: "icon",
  definition: "a crate's icon picture, carried as text beside the crate's page",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A crate's icon is a picture rather than text.",
    },
    {
      invariantKind: "departure",
      statement: "The picture is carried as base64 in json, so the file holds no NUL byte.",
    },
    {
      invariantKind: "departure",
      statement: "A crate's icon is in akasha rather than outside it.",
    },
    {
      invariantKind: "departure",
      statement: "The seam building the crate writes the picture where Cargo reads it.",
    },
  ],
} as const satisfies FileProperty
