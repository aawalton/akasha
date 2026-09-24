import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const royalRoadSite = {
  id: "01a0d498-428d-77c8-a15c-474fcd13d1d9",
  type: "page-type/domain",
  slug: "royal-road-site",
  definition: "an external service where people write stories",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Royal Road" }],
} as const satisfies Domain
