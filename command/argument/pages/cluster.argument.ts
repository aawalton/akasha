import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const cluster = {
  id: "01a094c1-5e7b-7352-8cf7-28fbf55418ef",
  type: "page-type/argument",
  slug: "cluster",
  said: "--cluster",
  takes: "the cluster acted on",
  value: "text",
  placeholder: "name",
  default: "main",
  createdAt: "2026-09-12T08:34:55.739Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
