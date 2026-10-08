import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const lexiconWord = {
  id: "01a0d9ab-8149-757f-814a-704145ba7bc4",
  type: "page-type/argument",
  slug: "lexicon-word",
  said: "--word",
  takes: "a word looked up in the lexicon",
  value: "text",
  placeholder: "word",
  createdAt: "2026-09-25T17:44:50.761Z",
  updatedAt: "2026-09-25T17:45:01.000Z",
} as const satisfies Argument
