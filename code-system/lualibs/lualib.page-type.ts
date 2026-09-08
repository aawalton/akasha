import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { Code } from "../modules/properties/code.file-property.ts"
import type { CompiledLua } from "./properties/compiled-lua.file-property.ts"
import type { LuaExport } from "./properties/lua-export.text-property.ts"
import type { Lua50Code } from "./properties/lua50-code.file-property.ts"

export type Lualib = Domain & {
  code: Code
  lua50Code?: Lua50Code
  compiledLua?: CompiledLua
  luaExport: LuaExport
}

export const lualib = {
  id: "01a0816a-91f6-79d0-8293-0fb65177f129",
  pageTypeSlug: "page-type",
  slug: "lualib",
  definition: "one helper a compiler writes into every addon's Lua",
  pluralSlug: "lualibs",
  partSlugs: ["file-property/compiled-lua", "file-property/lua50-code", "text-property/lua-export"],
  extendsSlug: ["page-type/domain"],
  properties: [
    { pagePropertySlug: "file-property/code", required: true, many: false },
    { pagePropertySlug: "file-property/lua50-code", required: false, many: false },
    { pagePropertySlug: "file-property/compiled-lua", required: false, many: false },
    { pagePropertySlug: "text-property/lua-export", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A helper's TypeScript is held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "One exported name is one page.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no Lua 5.0 code is compiled from its code for every build.",
    },
  ],
} as const satisfies PageType
