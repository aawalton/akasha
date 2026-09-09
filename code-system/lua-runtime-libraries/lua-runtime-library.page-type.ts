import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { Lua50Config } from "./properties/lua50-config.file-property.ts"
import type { UniversalConfig } from "./properties/universal-config.file-property.ts"

export type LuaRuntimeLibrary = Domain & {
  universalConfig: UniversalConfig
  lua50Config: Lua50Config
}

export const luaRuntimeLibrary = {
  id: "01a06759-2aa6-7000-9523-2fbcc69fd891",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "lua-runtime-library",
  definition: "TypeScript a compiler turns into the Lua a game loads",
  pluralSlug: "lua-runtime-libraries",
  parts: ["file-property/lua50-config", "file-property/universal-config"],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "file-property/universal-config", required: true, many: false },
    { pageProperty: "file-property/lua50-config", required: true, many: false },
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
      statement: "A build's config overlays which of the two files that build reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A file here has no page of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A function compiled here takes a hidden receiver, no config here turning implicit self off.",
    },
    {
      invariantKind: "departure",
      statement: "A callback-typed property here declares its own this parameter.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Flattening this tree changes which file a name reaches without any name changing.",
    },
  ],
} as const satisfies PageType
