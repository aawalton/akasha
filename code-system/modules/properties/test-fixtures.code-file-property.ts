import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export type TestFixtures = "ts"

export const testFixtures = {
  id: "01a04ed9-bf7f-7000-8467-46048a3d88f4",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "test-fixtures",
  propertySlug: "test-fixtures",
  definition: "what a page's test is set up with",
} as const satisfies CodeFileProperty
