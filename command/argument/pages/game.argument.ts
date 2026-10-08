import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const game = {
  id: "01a0c5fe-f307-73c2-b2cf-f2cc2e403172",
  type: "page-type/argument",
  slug: "game",
  said: "--game",
  takes: "the game being played",
  value: "text",
  placeholder: "address",
  createdAt: "2026-09-21T22:03:35.047Z",
  updatedAt: "2026-09-21T22:04:07.000Z",
} as const satisfies Argument
