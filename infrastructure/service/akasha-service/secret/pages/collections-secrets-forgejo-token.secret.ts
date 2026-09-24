import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const collectionsSecretsForgejoToken = {
  id: "01a07697-fc01-7feb-ab00-5fb0dc615c2f",
  type: "page-type/secret",
  slug: "collections-secrets-forgejo-token",
  placements: [{ resourceName: "collections-secrets", resourceKey: "FORGEJO_TOKEN" }],
} as const satisfies Secret
