import type { LuaModule } from "@akasha/code-system/lua-module"

export const catalogConfigFile = {
  id: "01a063ba-94e5-7985-98c9-01225f7eeb33",
  pageTypeSlug: "lua-module",
  slug: "catalog-config-file",
  definition: "the one name the catalog add-on's side file is read back into",
  lua: "lua",
  loadedAs: "TemperCatalogConfig.lua",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The name starts out empty and the game fills the name from the saved variables file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The game loads the file before the compiled add-on rather than compiling the two as one.",
    },
  ],
} as const satisfies LuaModule
