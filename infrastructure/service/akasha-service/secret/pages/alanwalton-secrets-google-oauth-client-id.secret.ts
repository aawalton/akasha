import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsGoogleOauthClientId = {
  id: "01a0baef-ba51-797e-b4d2-969094d16c40",
  type: "page-type/secret",
  slug: "alanwalton-secrets-google-oauth-client-id",
  placements: [
    { resourceName: "alanwalton-secrets", resourceKey: "GOOGLE_OAUTH_CLIENT_ID" },
    { resourceName: "temper-secrets", resourceKey: "GOOGLE_OAUTH_CLIENT_ID" },
    { resourceName: "archive-of-worlds-secrets", resourceKey: "GOOGLE_OAUTH_CLIENT_ID" },
    { resourceName: "audhdalan-secrets", resourceKey: "GOOGLE_OAUTH_CLIENT_ID" },
  ],
  createdAt: "2026-09-19T18:31:08.113Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
