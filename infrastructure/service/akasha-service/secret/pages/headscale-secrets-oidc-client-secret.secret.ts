import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const headscaleSecretsOidcClientSecret = {
  id: "01a0768b-1a0b-793a-a6a3-3c5abb756f0c",
  type: "page-type/secret",
  slug: "headscale-secrets-oidc-client-secret",
  placements: [{ resourceName: "headscale-secrets", resourceKey: "oidc_client_secret" }],
  createdAt: "2026-09-06T11:47:02.795Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
