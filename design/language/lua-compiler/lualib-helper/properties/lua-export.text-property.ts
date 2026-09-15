import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const luaExport = {
  id: "01a08168-a789-7c4b-8c96-68f15749213a",
  type: "text-property",
  slug: "lua-export",
  propertySlug: "lua-export",
  definition: "the name a compiled helper is reached by in Lua",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A name here is chosen outside akasha.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name is stated rather than worked out from the page's slug.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
