import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const game = {
  id: "01a0c5fe-f307-73c2-b2cf-f2cc2e403172",
  type: "page-type/argument",
  slug: "game",
  said: "--game",
  takes: "the game being played",
  value: "text",
  placeholder: "address",
} as const satisfies Argument
