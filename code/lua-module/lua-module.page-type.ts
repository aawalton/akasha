import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const luaModule = {
  id: "01a06036-9b74-79ba-9f54-27289400cf14",
  type: "page-type/page-type",
  slug: "lua-module",
  definition: "Lua the game loads without compiling it",
  parts: ["code-file-property/lua"],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "code-file-property/lua", required: true, many: false },
    { pageProperty: "text-property/loaded-as", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Lua module's code is in a file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here is imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The addon loading a Lua module names that module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A module no manifest loads states no name to be loaded by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lua a compiler wrote out of TypeScript is no Lua module.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
