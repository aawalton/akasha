import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const parseLuaCapture = {
  id: "01a08e0c-2af7-7ac7-841c-ccaa3d4ee31b",
  type: "page-type/module",
  slug: "parse-lua-capture",
  definition: "the text a Lua pattern capture holds, or nothing where it caught none",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture that matched nothing comes back as nil rather than as text.",
    },
  ],
} as const satisfies Module
