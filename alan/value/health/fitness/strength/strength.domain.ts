import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const strength = {
  id: "01a0911d-062d-7eb2-a167-500195a36ae0",
  type: "page-type/domain",
  slug: "strength",
  definition: "how Alan trains his strength",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "strength" }],
  parts: [
    "computed-property-module/lifting",
    "page-type/strength-decline",
    "page-type/strength-exercise",
    "page-type/strength-log",
  ],
  createdAt: "2026-09-11T15:36:33.581Z",
  updatedAt: "2026-09-25T13:22:42.000Z",
} as const satisfies Domain
