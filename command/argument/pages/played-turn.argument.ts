import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const playedTurn = {
  id: "01a0deca-7611-7c47-ad2d-647185f28835",
  type: "page-type/argument",
  slug: "played-turn",
  said: "--turn",
  takes: "the played turn, named by its address, its slug or its page's path",
  value: "text",
  placeholder: "address",
  createdAt: "2026-09-26T17:36:45.585Z",
  updatedAt: "2026-10-17T18:14:36.846Z",
} as const satisfies Argument
