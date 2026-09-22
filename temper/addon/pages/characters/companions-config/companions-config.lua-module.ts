import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const companionsConfig = {
  id: "01a0611d-84d1-7c75-9512-d3ca1613f0bb",
  type: "page-type/lua-module",
  slug: "companions-config",
  definition: "the name of the global holding the companion target builds",
  lua: "lua",
  loadedAs: "TemperCharactersCompanionsConfig.lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The name starts out empty and the game fills the name from the saved variables file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The game loads the file before the compiled add-on rather than compiling the two together.",
    },
  ],
} as const satisfies LuaModule
