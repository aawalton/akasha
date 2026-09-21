import type { Secret } from "akasha/infrastructure/service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsMediaTokenSecret = {
  id: "01a0c454-10e4-70d8-a1f5-3bade920efcb",
  type: "page-type/secret",
  slug: "alanwalton-secrets-media-token-secret",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "MEDIA_TOKEN_SECRET" }],
} as const satisfies Secret
