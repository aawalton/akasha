import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const predicate = {
  id: "01a0a650-a29f-701a-98c8-1be6ae090422",
  type: "page-type/argument",
  slug: "predicate",
  said: "--predicate",
  takes: "the slug of the one predicate a closure follows",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
