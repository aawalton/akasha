import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const disabilityAdjustedMicromort = {
  id: "01a183a4-f946-79a4-afdf-acaf51103b71",
  type: "page-type/domain",
  slug: "disability-adjusted-micromort",
  definition: "a loss of one-millionth of Alan's remaining healthy life expectancy",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "disability-adjusted micromort" },
    { partOfSpeech: "part-of-speech/noun", spelling: "disability-adjusted micromorts" },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A death costs the whole of Alan's remaining healthy life expectancy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A year lived disabled costs that disability's weight in the Global Burden of Disease study.",
    },
  ],
  createdAt: "2026-10-28T17:53:09.445Z",
  updatedAt: "2026-10-28T17:53:09.445Z",
} as const satisfies Domain
