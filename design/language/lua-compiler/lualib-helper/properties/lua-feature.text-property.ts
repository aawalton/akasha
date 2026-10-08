import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const luaFeature = {
  id: "01a081d9-0177-760b-bdf9-9a8231cf9177",
  type: "page-type/text-property",
  slug: "lua-feature",
  propertySlug: "lua-feature",
  definition: "the lualib feature a helper is emitted as",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no feature takes the feature its Lua export names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page states a feature where the export name that page would take is another page's.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-08T16:27:57.687Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
