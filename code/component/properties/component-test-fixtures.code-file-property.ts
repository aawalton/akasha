import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const componentTestFixtures = {
  id: "01a071cb-913e-718f-a95d-e71e4f37aad6",
  type: "page-type/code-file-property",
  slug: "component-test-fixtures",
  propertySlug: "test-fixtures",
  definition: "the fixtures setting up a component's test",
  extensions: ["tsx"],
  types: "ts",
} as const satisfies CodeFileProperty
