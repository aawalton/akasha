import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const bunConfig = {
  id: "01a06cd1-f990-70ec-8845-8d5a86c0e992",
  type: "file-property",
  slug: "bun-config",
  propertySlug: "bun-config",
  definition: "what the package manager is told about this tree",
  extensions: ["toml"],
  fileName: "bunfig.toml",
  toolResolvesPaths: true,
  types: "ts",
} as const satisfies FileProperty
