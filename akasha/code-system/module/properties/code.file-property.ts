import type { FileProperty } from "../../../pages-system/page-property/file-property.page-type.ts"

export type Code = "ts"

export const code = {
  id: "01a04a20-6e04-7e3d-88e8-a8af6fd9c02b",
  pageTypeSlug: "file-property",
  slug: "code",
  definition: "the code a page is, held in a file of its own",
} as const satisfies FileProperty
