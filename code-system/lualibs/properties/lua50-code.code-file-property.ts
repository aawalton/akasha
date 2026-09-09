import type { CodeFileProperty } from "@akasha/pages/code-file-property"

export type Lua50Code = "ts"

export const lua50Code = {
  id: "01a0816a-2827-7fb0-812f-4e5959ef05ac",
  pageTypeSlug: "code-file-property",
  slug: "lua50-code",
  propertySlug: "lua50-code",
  definition: "the TypeScript a Lua 5.0 build takes in place of a page's code",
} as const satisfies CodeFileProperty
