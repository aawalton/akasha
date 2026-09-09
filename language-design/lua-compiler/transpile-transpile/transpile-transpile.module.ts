import type { Module } from "@akasha/code/module"

export const transpileTranspile = {
  id: "01a06758-8eda-7000-8b98-39a989b4ecda",
  pageTypeSlug: "module",
  type: "module",
  slug: "transpile-transpile",
  definition: "the printed Lua files and diagnostics one TypeScript program yields",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Whether Lua is written is stated by `no-emit-lua`.",
    },
    {
      invariantKind: "departure",
      statement: "A compile stating nothing there writes Lua unless TypeScript emits nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A compile emitting no JavaScript still writes Lua where it says so.",
    },
  ],
} as const satisfies Module
