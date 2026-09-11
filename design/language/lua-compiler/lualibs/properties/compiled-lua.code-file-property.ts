import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export const compiledLua = {
  id: "01a0816a-5592-72f4-bb18-b8c088a5bb4c",
  type: "code-file-property",
  slug: "compiled-lua",
  propertySlug: "compiled-lua",
  definition: "the Lua a compiler wrote from a page's TypeScript",
  extensions: ["lua"],
  generated: true,
  types: "ts",
} as const satisfies CodeFileProperty
