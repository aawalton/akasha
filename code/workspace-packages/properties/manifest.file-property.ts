import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const manifest = {
  id: "01a05891-1ea3-7812-a163-a7b4dd664f62",
  type: "file-property",
  slug: "manifest",
  propertySlug: "manifest",
  definition: "what a package states about itself",
  extensions: ["json"],
  fileName: "package.json",
  runsFileLength: false,
  toolResolvesPaths: true,
  types: "ts",
} as const satisfies FileProperty
