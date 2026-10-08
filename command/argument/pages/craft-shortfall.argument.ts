import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const craftShortfall = {
  id: "01a0d4a5-749b-76f1-aa49-a20bf49786e9",
  type: "page-type/argument",
  slug: "craft-shortfall",
  said: "--craft-shortfall",
  takes: "whether a stocking rule crafts what the account holds short of its target",
  value: "true-or-false",
  createdAt: "2026-09-24T18:20:08.219Z",
  updatedAt: "2026-09-24T18:21:07.000Z",
} as const satisfies Argument
