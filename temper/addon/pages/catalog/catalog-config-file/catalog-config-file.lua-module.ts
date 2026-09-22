import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const catalogConfigFile = {
  id: "01a063ba-94e5-7985-98c9-01225f7eeb33",
  type: "page-type/lua-module",
  slug: "catalog-config-file",
  definition: "the name the catalog add-on's side file is read back into",
  lua: "lua",
  loadedAs: "TemperCatalogConfig.lua",
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
