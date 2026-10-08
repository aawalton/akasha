import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const bunConfig = {
  id: "01a06cd1-f990-70ec-8845-8d5a86c0e992",
  type: "page-type/file-property",
  slug: "bun-config",
  propertySlug: "bun-config",
  definition: "what the package manager is told about this tree",
  extensions: ["toml"],
  fileName: "bunfig.toml",
  toolResolvesPaths: true,
  types: "ts",
  createdAt: "2026-09-04T14:28:15.376Z",
  updatedAt: "2026-09-15T16:56:11.000Z",
} as const satisfies FileProperty
