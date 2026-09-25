import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const trialConstruction = {
  id: "01a0d9ad-2987-798e-82c8-40fb931fdabe",
  type: "page-type/argument",
  slug: "trial-construction",
  said: "--construction",
  takes: "a phrase kind and the items a tried construction writes it from",
  value: "text",
  placeholder: "phrase-kind=item,item",
} as const satisfies Argument
