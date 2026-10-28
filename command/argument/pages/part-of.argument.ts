import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const partOf = {
  id: "01a183cc-edbf-792e-af32-5d503281f04b",
  type: "page-type/argument",
  slug: "part-of",
  said: "--part-of",
  takes: "the collection a title is a part of, said as its page type and slug",
  value: "text",
  placeholder: "collection",
  createdAt: "2026-10-28T18:36:47.934Z",
  updatedAt: "2026-10-28T18:36:47.934Z",
} as const satisfies Argument
