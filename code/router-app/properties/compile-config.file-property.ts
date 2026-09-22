import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const compileConfig = {
  id: "01a07332-f5be-7b44-8a0a-e0d49f66e942",
  type: "page-type/file-property",
  slug: "compile-config",
  propertySlug: "compile-config",
  definition: "a router app's own TypeScript compile settings",
  extensions: ["json"],
  fileName: "tsconfig.json",
  toolResolvesPaths: true,
  types: "ts",
} as const satisfies FileProperty
