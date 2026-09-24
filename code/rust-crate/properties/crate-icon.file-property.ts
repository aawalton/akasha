import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const crateIcon = {
  id: "01a0693a-5bbe-7c76-b5ef-d2e85fbec62f",
  type: "page-type/file-property",
  slug: "crate-icon",
  propertySlug: "crate-icon",
  definition: "a crate's icon picture, carried as text beside the crate's page",
  extensions: ["json"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A crate's icon is a picture rather than text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The picture is carried as base64 in json.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file has no NUL byte.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A crate's icon is in akasha rather than outside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seam building the crate writes the picture where Cargo reads that picture.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
