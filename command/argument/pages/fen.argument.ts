import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const fen = {
  id: "01a0a03c-5437-7e50-9229-98dabcfaea75",
  type: "argument",
  slug: "fen",
  said: "--fen",
  takes: "the position to open from, in Forsyth-Edwards notation",
  value: "text",
  placeholder: "position",
} as const satisfies Argument
