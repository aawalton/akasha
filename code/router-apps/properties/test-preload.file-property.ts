import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const testPreload = {
  id: "01a081a7-94db-7f89-b28d-d6b14b0058eb",
  type: "file-property",
  slug: "test-preload",
  propertySlug: "test-preload",
  definition: "what a test run loads before the first test",
  extensions: ["toml"],
  fileName: "bunfig.toml",
  toolResolvesPaths: true,
  types: "ts",
} as const satisfies FileProperty
