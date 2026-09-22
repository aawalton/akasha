import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const testFixtures = {
  id: "01a04ed9-bf7f-7000-8467-46048a3d88f4",
  type: "page-type/code-file-property",
  slug: "test-fixtures",
  propertySlug: "test-fixtures",
  definition: "what sets up a page's test",
  extensions: ["ts"],
  types: "ts",
} as const satisfies CodeFileProperty
