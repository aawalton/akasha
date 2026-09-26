import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const reviewer = {
  id: "01a0deca-7611-7428-ba59-e8a100dc4872",
  type: "page-type/argument",
  slug: "reviewer",
  said: "--reviewer",
  takes: "the story reviewer handing in what it found",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
