import type { Secret } from "../secret.page-type.types.ts"

export const alanwaltonSecretsGeoapifyApiKey = {
  id: "01a076d8-38b9-76e6-8d2a-d3ceebe547a9",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "alanwalton-secrets-geoapify-api-key",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "GEOAPIFY_API_KEY" }],
} as const satisfies Secret
