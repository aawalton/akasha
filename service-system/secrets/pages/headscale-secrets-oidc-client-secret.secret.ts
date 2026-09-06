import type { Secret } from "../secret.page-type.ts"

export const headscaleSecretsOidcClientSecret = {
  id: "01a0768b-1a0b-793a-a6a3-3c5abb756f0c",
  pageTypeSlug: "secret",
  slug: "headscale-secrets-oidc-client-secret",
  placements: [{ resourceName: "headscale-secrets", resourceKey: "oidc_client_secret" }],
} as const satisfies Secret
