import type { Secret } from "../secret.page-type.types.ts"

export const collectionsSecretsScraperapiApiKey = {
  id: "01a076b7-80c3-7f10-98df-e609509e1646",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-scraperapi-api-key",
  placements: [
    { resourceName: "collections-secrets", resourceKey: "SCRAPERAPI_API_KEY" },
    { resourceName: "alanwalton-secrets", resourceKey: "SCRAPERAPI_API_KEY" },
  ],
} as const satisfies Secret
