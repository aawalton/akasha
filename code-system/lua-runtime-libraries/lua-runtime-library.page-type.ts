import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Lua50Config } from "./properties/lua50-config.named-file-property.ts"
import type { UniversalConfig } from "./properties/universal-config.named-file-property.ts"

export type LuaRuntimeLibrary = Domain & {
  universalConfig: UniversalConfig
  lua50Config: Lua50Config
}

export const luaRuntimeLibrary = {
  id: "01a06759-2aa6-7000-9523-2fbcc69fd891",
  pageTypeSlug: "page-type",
  slug: "lua-runtime-library",
  definition: "TypeScript a compiler turns into the Lua a game loads",
  pluralSlug: "lua-runtime-libraries",
  partSlugs: ["named-file-property/lua50-config", "named-file-property/universal-config"],
  extendsSlug: "page-type/domain",
  properties: [
    { pagePropertySlug: "universal-config", required: true, many: false },
    { pagePropertySlug: "lua50-config", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A source tree here is compiled as one program rather than imported module by module.",
    },
    {
      invariantKind: "departure",
      statement: "The folders a source tree is laid out in choose which file a name reaches.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two files of one name under two folders are one module to whatever imports that name.",
    },
    {
      invariantKind: "departure",
      statement: "Which of the two a build reaches is what that build's config overlays.",
    },
    {
      invariantKind: "departure",
      statement: "A file here carries no page of its own.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Flattening this tree changes which file a name reaches without any name changing.",
    },
  ],
} as const satisfies PageType
