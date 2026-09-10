import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const lualib = {
  id: "01a0816a-91f6-79d0-8293-0fb65177f129",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "lualib",
  definition: "one helper a compiler writes into every addon's Lua",
  pluralSlug: "lualibs",
  parts: [
    "code-file-property/compiled-lua",
    "code-file-property/lua50-code",
    "text-property/lua-export",
    "text-property/lua-feature",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "code-file-property/code", required: true, many: false },
    { pageProperty: "code-file-property/lua50-code", required: false, many: false },
    { pageProperty: "code-file-property/compiled-lua", required: false, many: false },
    { pageProperty: "text-property/lua-export", required: true, many: false },
    { pageProperty: "text-property/lua-feature", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A helper's TypeScript is in a file beside the page.",
    },
    {
      invariantKind: "constraint",
      statement: "A helper's exported name is the ECMAScript runtime's rather than akasha's.",
    },
    {
      invariantKind: "departure",
      statement: "The rules refusing a shadowed global name and refusing `any` are off here.",
    },
    {
      invariantKind: "constraint",
      statement: "A helper names an argument for what that argument is rather than for its scope.",
    },
    {
      invariantKind: "departure",
      statement: "The rule refusing a name that shadows an outer name is off here.",
    },
    {
      invariantKind: "constraint",
      statement: "A value compared with itself is how the ECMAScript runtime tests for NaN.",
    },
    {
      invariantKind: "departure",
      statement: "The rule refusing a value compared with itself is off here.",
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
  types: "ts",
} as const satisfies PageType
