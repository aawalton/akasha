import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsGoogleOauthClientSecret = {
  id: "01a0baef-cca7-7e63-8227-48e39de287cb",
  type: "page-type/secret",
  slug: "alanwalton-secrets-google-oauth-client-secret",
  placements: [
    { resourceName: "alanwalton-secrets", resourceKey: "GOOGLE_OAUTH_CLIENT_SECRET" },
    { resourceName: "temper-secrets", resourceKey: "GOOGLE_OAUTH_CLIENT_SECRET" },
    { resourceName: "archive-of-worlds-secrets", resourceKey: "GOOGLE_OAUTH_CLIENT_SECRET" },
    { resourceName: "audhdalan-secrets", resourceKey: "GOOGLE_OAUTH_CLIENT_SECRET" },
  ],
  createdAt: "2026-09-19T18:31:12.807Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
