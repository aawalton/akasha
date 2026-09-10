import type { PageType } from "@akasha/pages/page-type"

export const luaModule = {
  id: "01a06036-9b74-79ba-9f54-27289400cf14",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "lua-module",
  definition: "Lua the game loads without compiling it",
  pluralSlug: "lua-modules",
  parts: ["code-file-property/lua"],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "code-file-property/lua", required: true, many: false },
    { pageProperty: "text-property/loaded-as", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A Lua module's code is in a file beside the page.",
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
  types: "ts",
} as const satisfies PageType
