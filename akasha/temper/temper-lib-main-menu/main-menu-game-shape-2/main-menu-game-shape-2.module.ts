import type { Module } from "@akasha/code-system/module"

export const mainMenuGameShape2 = {
  id: "01a0605b-c803-7d07-8439-d7c173d910ac",
  pageTypeSlug: "module",
  slug: "main-menu-game-shape-2",
  definition: "the game globals this addon reads that the shared typings lack",
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
      invariantKind: "constraint",
      statement: "A name the shared game typings already hold is not declared here.",
    },
  ],
} as const satisfies Module
