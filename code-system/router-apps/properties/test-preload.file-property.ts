import type { FileProperty } from "@akasha/pages/file-property"

export type TestPreload = "toml"

export const testPreload = {
  id: "01a081a7-94db-7f89-b28d-d6b14b0058eb",
  pageTypeSlug: "file-property",
  slug: "test-preload",
  propertySlug: "test-preload",
  definition: "what a test run loads before the first test",
  fileName: "bunfig.toml",
} as const satisfies FileProperty
