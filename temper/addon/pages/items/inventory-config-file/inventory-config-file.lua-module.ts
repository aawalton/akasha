import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const inventoryConfigFile = {
  id: "01a06258-b536-7417-855d-e9bd5aa14816",
  type: "page-type/lua-module",
  slug: "inventory-config-file",
  definition: "the global name holding the inventory add-on's config",
  lua: "lua",
  loadedAs: "TemperItemsConfig.lua",
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
