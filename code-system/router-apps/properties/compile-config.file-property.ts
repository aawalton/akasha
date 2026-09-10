import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type CompileConfig = "json"

export const compileConfig = {
  id: "01a07332-f5be-7b44-8a0a-e0d49f66e942",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "compile-config",
  propertySlug: "compile-config",
  definition: "the TypeScript settings a router app's own compile runs under",
  fileName: "tsconfig.json",
} as const satisfies FileProperty
