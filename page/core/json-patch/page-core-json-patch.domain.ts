import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageCoreJsonPatch = {
  id: "01a071cb-06e1-77a7-9b87-356db476d706",
  type: "page-type/domain",
  slug: "page-core-json-patch",
  definition: "how code changes a value with JSON Patch",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "JSON Patch" }],
  parts: ["module/apply", "module/jsonb-ops"],
} as const satisfies Domain
