import type { FileProperty } from "../../../pages-system/page-property/file-property.page-type.ts"

export type TestFixtures = "ts"

export const testFixtures = {
  id: "01a04ed9-bf7f-7000-8467-46048a3d88f4",
  pageTypeSlug: "file-property",
  slug: "test-fixtures",
  definition: "what a page's test is set up with, held in a file of its own",
} as const satisfies FileProperty
