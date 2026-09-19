import type { Secret } from "akasha/infrastructure/service/secret/secret.page-type.types.ts"

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
} as const satisfies Secret
