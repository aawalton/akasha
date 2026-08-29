import type { FileProperty } from "../../../pages-system/page-property/file-property.page-type.ts"

export type Test = "ts"

export const test = {
  id: "01a04a2e-7e3e-7000-acbe-3a33ab105ce0",
  pageTypeSlug: "file-property",
  slug: "test",
  definition: "what proves a page's code, held in a file of its own",
} as const satisfies FileProperty
