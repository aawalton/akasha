import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type LuaExport = string

export const luaExport = {
  id: "01a08168-a789-7c4b-8c96-68f15749213a",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "lua-export",
  propertySlug: "lua-export",
  definition: "the name a compiled helper is reached by in Lua",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A name here is chosen outside akasha.",
    },
    {
      invariantKind: "departure",
      statement: "The name is stated rather than worked out from the page's slug.",
    },
  ],
} as const satisfies TextProperty
