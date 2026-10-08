import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const lexiconScope = {
  id: "01a0d9ab-8148-7981-9713-894f154892b9",
  type: "page-type/argument",
  slug: "lexicon-scope",
  said: "--scope",
  takes: "the slug of the page whose lexicon the words are read in",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-09-25T17:44:50.760Z",
  updatedAt: "2026-09-25T17:45:01.000Z",
} as const satisfies Argument
