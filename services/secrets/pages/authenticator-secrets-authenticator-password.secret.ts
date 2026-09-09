import type { Secret } from "../secret.page-type.ts"

export const authenticatorSecretsAuthenticatorPassword = {
  id: "01a07697-2e61-7209-95df-bca3fd6efb4d",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "authenticator-secrets-authenticator-password",
  placements: [{ resourceName: "authenticator-secrets", resourceKey: "AUTHENTICATOR_PASSWORD" }],
} as const satisfies Secret
