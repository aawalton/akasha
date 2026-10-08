import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsGeoapifyApiKey = {
  id: "01a076d8-38b9-76e6-8d2a-d3ceebe547a9",
  type: "page-type/secret",
  slug: "alanwalton-secrets-geoapify-api-key",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "GEOAPIFY_API_KEY" }],
  createdAt: "2026-09-06T13:11:16.921Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
