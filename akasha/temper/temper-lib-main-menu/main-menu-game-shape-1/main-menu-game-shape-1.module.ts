import type { Module } from "@akasha/code-system/module"

export const mainMenuGameShape1 = {
  id: "01a0605b-c803-73b6-bc0b-4d82b37a45a0",
  pageTypeSlug: "module",
  slug: "main-menu-game-shape-1",
  definition: "the menu shapes this addon adds to the game's own typings",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every declaration here widens the global scope.",
    },
    {
      invariantKind: "departure",
      statement: "An `Lmm` name describes a game table the game itself leaves unnamed.",
    },
    {
      invariantKind: "departure",
      statement: "A method takes an explicit `this` so the built Lua calls it with a colon.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is emitted into the built Lua.",
    },
    {
      invariantKind: "constraint",
      statement: "A name the shared game typings already hold is not declared here.",
    },
  ],
} as const satisfies Module
