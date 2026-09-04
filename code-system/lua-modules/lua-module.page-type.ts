import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { LoadedAs } from "../eso-interfaces/properties/loaded-as.text-property.ts"
import type { Lua } from "./properties/lua.file-property.ts"

export type LuaModule = Domain & {
  lua: Lua
  loadedAs?: LoadedAs
}

export const luaModule = {
  id: "01a06036-9b74-79ba-9f54-27289400cf14",
  pageTypeSlug: "page-type",
  slug: "lua-module",
  definition: "Lua the game loads without compiling it",
  pluralSlug: "lua-modules",
  partSlugs: ["file-property/lua"],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "lua", required: true, many: false },
    { pagePropertySlug: "loaded-as", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A Lua module's code is held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here is imported.",
    },
    {
      invariantKind: "departure",
      statement: "The addon loading a Lua module names that module.",
    },
    {
      invariantKind: "departure",
      statement: "A module no manifest loads states no name to be loaded by.",
    },
    {
      invariantKind: "departure",
      statement: "Lua a compiler wrote out of TypeScript is no Lua module.",
    },
  ],
} as const satisfies PageType
