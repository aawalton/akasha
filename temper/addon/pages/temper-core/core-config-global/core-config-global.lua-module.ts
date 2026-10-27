import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const coreConfigGlobal = {
  id: "01a17ec9-978e-7038-b332-f6a0a8bf0c8d",
  type: "page-type/lua-module",
  slug: "core-config-global",
  definition: "the name the watcher fills with the config Temper's core add-on reads",
  lua: "lua",
  loadedAs: "TemperConfig.lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The name starts out empty, and the watcher writes this file over with its value.",
    },
  ],
  createdAt: "2026-10-27T19:15:03.182Z",
  updatedAt: "2026-10-27T19:15:03.182Z",
} as const satisfies LuaModule
