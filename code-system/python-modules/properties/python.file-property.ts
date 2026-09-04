import type { FileProperty } from "@akasha/pages-system/file-property"

export type Python = "py"

export const python = {
  id: "01a06815-9efd-7002-a401-10c33e790ecf",
  pageTypeSlug: "file-property",
  slug: "python",
  propertySlug: "python",
  definition: "the Python a page is",
} as const satisfies FileProperty
