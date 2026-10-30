import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const identityStatementRank = {
  id: "01a0658a-739f-7e10-8159-f1a28e4d3724",
  type: "page-type/select-property",
  slug: "identity-statement-rank",
  propertySlug: "identity-statement-rank",
  definition: "how hard this statement is to hold",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "identity statement rank" }],
  values: ["s-rank", "a-rank", "b-rank", "c-rank", "d-rank"],
  types: "ts",
  createdAt: "2026-09-03T04:32:47.519Z",
  updatedAt: "2026-10-30T16:44:43.453Z",
} as const satisfies SelectProperty
