import type { FileProperty } from "@akasha/pages-system/file-property"

export type AppIcon = "json"

export const appIcon = {
  id: "01a0693a-5bbe-78fb-8ea4-9abb461c372c",
  pageTypeSlug: "file-property",
  slug: "app-icon",
  propertySlug: "icon",
  definition: "an app's icon picture, carried as text beside the app's page",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An app's icon is a picture rather than text.",
    },
    {
      invariantKind: "departure",
      statement: "The picture is carried as base64 in json, so the file holds no NUL byte.",
    },
    {
      invariantKind: "departure",
      statement: "An app's icon is in akasha rather than outside it.",
    },
    {
      invariantKind: "departure",
      statement: "The seam building the app writes the picture where Xcode reads it.",
    },
  ],
} as const satisfies FileProperty
