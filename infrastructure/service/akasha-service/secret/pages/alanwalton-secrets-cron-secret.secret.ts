import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsCronSecret = {
  id: "01a076d8-38b9-7bc0-aa5b-45e20998d323",
  type: "page-type/secret",
  slug: "alanwalton-secrets-cron-secret",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "CRON_SECRET" }],
} as const satisfies Secret
