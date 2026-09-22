import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transpileTranspile = {
  id: "01a06758-8eda-7000-8b98-39a989b4ecda",
  type: "page-type/module",
  slug: "transpile-transpile",
  definition: "the printed Lua files and diagnostics a TypeScript program yields",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether Lua is written is stated by `no-emit-lua`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A compile stating nothing there writes Lua unless TypeScript emits nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A compile emitting no JavaScript still writes Lua where `no-emit-lua` says so.",
    },
  ],
} as const satisfies Module
