import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const appIcon = {
  id: "01a0693a-5bbe-78fb-8ea4-9abb461c372c",
  type: "page-type/file-property",
  slug: "app-icon",
  propertySlug: "app-icon",
  definition: "an app's icon picture, carried as text beside the app's page",
  extensions: ["json"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An app's icon is a picture rather than text.",
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
      statement: "An app's icon is in akasha rather than outside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seam building the app writes the picture where Xcode reads that picture.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
