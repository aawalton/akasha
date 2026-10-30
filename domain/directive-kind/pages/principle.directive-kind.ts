import type { DirectiveKind } from "akasha/domain/directive-kind/directive-kind.page-type.types.ts"

export const principle = {
  id: "01a04e1f-cbf6-76a0-af13-340b5a10f80f",
  type: "page-type/directive-kind",
  slug: "principle",
  definition: "a truth packed tight so it reaches many cases",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "principle" },
    { partOfSpeech: "part-of-speech/noun", spelling: "principles" },
  ],
  createdAt: "2026-08-29T15:25:01.814Z",
  updatedAt: "2026-10-30T17:46:13.318Z",
} as const satisfies DirectiveKind
