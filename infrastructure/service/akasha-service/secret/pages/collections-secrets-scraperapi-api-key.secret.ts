import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const collectionsSecretsScraperapiApiKey = {
  id: "01a076b7-80c3-7f10-98df-e609509e1646",
  type: "page-type/secret",
  slug: "collections-secrets-scraperapi-api-key",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "SCRAPERAPI_API_KEY" }],
  createdAt: "2026-09-06T12:35:32.675Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
