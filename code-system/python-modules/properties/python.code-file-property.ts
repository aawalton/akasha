import type { CodeFileProperty } from "@akasha/pages/code-file-property"

export type Python = "py"

export const python = {
  id: "01a06815-9efd-7002-a401-10c33e790ecf",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "python",
  propertySlug: "python",
  definition: "the Python a page is",
} as const satisfies CodeFileProperty
