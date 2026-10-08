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
  createdAt: "2026-09-05T20:11:54.686Z",
  updatedAt: "2026-09-22T14:00:01.000Z",
} as const satisfies FileProperty
