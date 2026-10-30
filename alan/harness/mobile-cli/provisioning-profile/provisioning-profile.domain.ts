import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const provisioningProfile = {
  id: "01a18d9e-63c8-7c0d-b9a6-6db620134c20",
  type: "page-type/domain",
  slug: "provisioning-profile",
  definition: "a file that Apple makes for each app and the certificate that signs that app",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "provisioning profile" },
    { partOfSpeech: "part-of-speech/noun", spelling: "provisioning profiles" },
  ],
  createdAt: "2026-10-30T16:22:10.115Z",
  updatedAt: "2026-10-30T16:22:10.115Z",
} as const satisfies Domain
