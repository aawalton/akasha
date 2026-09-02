import type { Module } from "@akasha/code-system/module"

export const customMenuMain = {
  id: "01a0605a-581f-7713-b312-1a2797643fae",
  pageTypeSlug: "module",
  slug: "custom-menu-main",
  definition: "the wiring the custom menu library does as the game loads it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The hooks go in once the first addon that is not the game's own has loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The guild roster is hooked later than the other social lists.",
    },
  ],
} as const satisfies Module
