import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mainMenuCasts = {
  id: "01a0605b-c801-75ea-bec7-99b3645fcbda",
  type: "page-type/module",
  slug: "main-menu-casts",
  definition: "the narrowings from an untyped game value to a shape this library reads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrowing here asserts a shape rather than checking a shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller narrowing a game value states which shape the caller expects.",
    },
  ],
} as const satisfies Module
