import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const addedSpelling = {
  id: "01a0d9ad-2987-70ee-8a64-291b08358415",
  type: "page-type/argument",
  slug: "added-spelling",
  said: "--add",
  takes: "a word and the part of speech it is tried as, parted by a colon",
  value: "text",
  placeholder: "word:part-of-speech",
} as const satisfies Argument
