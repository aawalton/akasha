import type { Module } from "@akasha/code-system/module"

export const movableWindow = {
  id: "01a060c4-17d0-7920-84d6-6391a39d187e",
  pageTypeSlug: "module",
  slug: "movable-window",
  definition: "a game window the player drags by a handle, kept where the player left it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Dragging the handle moves the whole window.",
    },
    {
      invariantKind: "departure",
      statement: "A window is clamped to the screen so no drag puts the window out of reach.",
    },
    {
      invariantKind: "departure",
      statement: "The position is handed to the caller each time a drag ends.",
    },
    {
      invariantKind: "departure",
      statement: "A window with no saved position falls back to the caller's default anchor.",
    },
    {
      invariantKind: "departure",
      statement: "A saved position is anchored from the top left of the game's root.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "No position is kept here.",
    },
  ],
} as const satisfies Module
