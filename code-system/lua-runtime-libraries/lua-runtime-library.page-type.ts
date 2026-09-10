import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

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
      statement:
        "A function compiled here takes a hidden receiver, no config here turning implicit self off.",
    },
    {
      invariantKind: "departure",
      statement: "A callback-typed property here declares its own this parameter.",
    },
  ],
  types: "ts",
} as const satisfies PageType
