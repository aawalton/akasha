import type { CodeFileProperty } from "@akasha/pages/code-file-property"

export type Lua = "lua"

export const lua = {
  id: "01a06036-9b75-73f4-bf30-9eaf95ccf3fc",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "lua",
  propertySlug: "lua",
  definition: "the Lua a page is",
} as const satisfies CodeFileProperty
