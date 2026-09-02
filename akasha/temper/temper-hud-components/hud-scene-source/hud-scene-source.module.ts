import type { Module } from "@akasha/code-system/module"

export const hudSceneSource = {
  id: "01a060a4-fa39-75fa-b8ed-cd9e167bd81c",
  pageTypeSlug: "module",
  slug: "hud-scene-source",
  definition: "the game file every catalogued HUD part is found in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The path is written from the root of the game's UI source clone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
