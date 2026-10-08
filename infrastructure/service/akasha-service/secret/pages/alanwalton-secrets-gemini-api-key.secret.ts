import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsGeminiApiKey = {
  id: "01a11b2f-6699-75b5-853d-b2397bf12f2f",
  type: "page-type/secret",
  slug: "alanwalton-secrets-gemini-api-key",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "GEMINI_API_KEY" }],
} as const satisfies Secret
