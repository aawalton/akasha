import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const fen = {
  id: "01a0a03c-5437-7e50-9229-98dabcfaea75",
  type: "page-type/argument",
  slug: "fen",
  said: "--fen",
  takes: "the position to open from, in Forsyth-Edwards notation",
  value: "text",
  placeholder: "position",
  createdAt: "2026-09-14T14:05:03.415Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
