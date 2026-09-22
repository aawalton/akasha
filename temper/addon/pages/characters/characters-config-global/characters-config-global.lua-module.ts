import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const charactersConfigGlobal = {
  id: "01a062e8-bed7-7010-8998-ffe3116644d2",
  type: "page-type/lua-module",
  slug: "characters-config-global",
  definition: "the name the characters add-on's saved variables are read back into",
  lua: "lua",
  loadedAs: "TemperCharactersConfig.lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The name starts out empty and the game fills the name from the saved variables file.",
    },
  ],
} as const satisfies LuaModule
