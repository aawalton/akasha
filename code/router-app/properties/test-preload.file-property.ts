import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const testPreload = {
  id: "01a081a7-94db-7f89-b28d-d6b14b0058eb",
  type: "page-type/file-property",
  slug: "test-preload",
  propertySlug: "test-preload",
  definition: "what a test run loads before the first test",
  extensions: ["toml"],
  fileName: "bunfig.toml",
  toolResolvesPaths: true,
  types: "ts",
  createdAt: "2026-09-08T15:33:58.619Z",
  updatedAt: "2026-09-15T16:56:11.000Z",
} as const satisfies FileProperty
