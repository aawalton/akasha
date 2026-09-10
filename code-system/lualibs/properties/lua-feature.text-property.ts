import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type LuaFeature = string

export const luaFeature = {
  id: "01a081d9-0177-760b-bdf9-9a8231cf9177",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "lua-feature",
  propertySlug: "lua-feature",
  definition: "the lualib feature a helper is emitted as",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page stating none takes the feature its Lua export names.",
    },
    {
      invariantKind: "departure",
      statement: "A page states one where the export name it would take is another page's.",
    },
  ],
} as const satisfies TextProperty
