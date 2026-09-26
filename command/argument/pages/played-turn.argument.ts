import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const playedTurn = {
  id: "01a0deca-7611-7c47-ad2d-647185f28835",
  type: "page-type/argument",
  slug: "played-turn",
  said: "--turn",
  takes: "the played turn, named by its address",
  value: "text",
  placeholder: "address",
} as const satisfies Argument
