import type { Module } from "@akasha/code-system/module"

export const seatTurnColor = {
  id: "01a06964-d998-7c3e-8f55-91ff918f96ac",
  pageTypeSlug: "module",
  slug: "seat-turn-color",
  definition: "the color a seat's turn state is drawn in, read off that state's own page",
  code: "ts",
} as const satisfies Module
