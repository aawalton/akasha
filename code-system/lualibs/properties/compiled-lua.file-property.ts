import type { FileProperty } from "@akasha/pages/file-property"

export type CompiledLua = "lua"

export const compiledLua = {
  id: "01a0816a-5592-72f4-bb18-b8c088a5bb4c",
  pageTypeSlug: "file-property",
  slug: "compiled-lua",
  propertySlug: "compiled-lua",
  definition: "the Lua a compiler wrote from a page's TypeScript",
  generated: true,
} as const satisfies FileProperty
