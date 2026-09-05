import type { FileProperty } from "@akasha/pages-system/file-property"

export type ComponentTestFixtures = "tsx"

export const componentTestFixtures = {
  id: "01a071cb-913e-718f-a95d-e71e4f37aad6",
  pageTypeSlug: "file-property",
  slug: "component-test-fixtures",
  propertySlug: "test-fixtures",
  definition: "what a component's test is set up with",
} as const satisfies FileProperty
