import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const luaRuntimeLibrary = {
  id: "01a06759-2aa6-7000-9523-2fbcc69fd891",
  type: "page-type/page-type",
  slug: "lua-runtime-library",
  definition: "TypeScript a compiler turns into the Lua a game loads",
  parts: ["file-property/lua50-config", "file-property/universal-config"],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "file-property/universal-config", required: true, many: false },
    { pageProperty: "file-property/lua50-config", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A source tree here is compiled as one program rather than imported module by module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A function compiled here takes a hidden receiver.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No config here turns implicit self off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A callback-typed property here declares its own this parameter.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
