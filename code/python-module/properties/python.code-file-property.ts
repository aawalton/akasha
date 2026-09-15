import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const python = {
  id: "01a06815-9efd-7002-a401-10c33e790ecf",
  type: "code-file-property",
  slug: "python",
  propertySlug: "python",
  definition: "the Python a page is",
  extensions: ["py"],
  types: "ts",
} as const satisfies CodeFileProperty
