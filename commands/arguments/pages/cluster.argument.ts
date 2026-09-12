import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const cluster = {
  id: "01a094c1-5e7b-7352-8cf7-28fbf55418ef",
  type: "argument",
  slug: "cluster",
  said: "--cluster",
  takes: "the cluster acted on, `main` where none is said",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
