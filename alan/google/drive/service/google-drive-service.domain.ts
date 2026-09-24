import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const googleDriveService = {
  id: "01a0d570-a766-7e57-8085-4ae29f6412c6",
  type: "page-type/domain",
  slug: "google-drive-service",
  definition: "an external service where people keep files",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Google Drive" }],
} as const satisfies Domain
