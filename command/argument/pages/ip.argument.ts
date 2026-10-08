import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const ip = {
  id: "01a094c2-52a7-7063-bb7c-a8e09ce22802",
  type: "page-type/argument",
  slug: "ip",
  said: "--ip",
  takes: "the address the node is reached at",
  value: "text",
  placeholder: "ip",
  createdAt: "2026-09-12T08:35:58.247Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
