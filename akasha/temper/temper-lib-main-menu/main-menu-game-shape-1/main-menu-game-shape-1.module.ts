import type { Module } from "@akasha/code-system/module"

export const mainMenuGameShape1 = {
  id: "01a0605b-c803-73b6-bc0b-4d82b37a45a0",
  pageTypeSlug: "module",
  slug: "main-menu-game-shape-1",
  definition: "the game's own globals and object shapes this addon reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every declaration here widens the global scope.",
    },
    {
      invariantKind: "departure",
      statement: "A name here is the game's own and is never renamed.",
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
      invariantKind: "stopgap",
      statement: "This copy is taken from the shared game typings that have yet to reach akasha.",
    },
  ],
} as const satisfies Module
