import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const headscaleSecretsNoisePrivateKey = {
  id: "01a0768b-3fff-70ae-a658-b2b7d2145f87",
  type: "page-type/secret",
  slug: "headscale-secrets-noise-private-key",
  placements: [{ resourceName: "headscale-secrets", resourceKey: "noise_private_key" }],
  createdAt: "2026-09-06T11:47:12.511Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
