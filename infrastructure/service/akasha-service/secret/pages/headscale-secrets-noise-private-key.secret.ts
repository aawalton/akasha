import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const headscaleSecretsNoisePrivateKey = {
  id: "01a0768b-3fff-70ae-a658-b2b7d2145f87",
  type: "page-type/secret",
  slug: "headscale-secrets-noise-private-key",
  placements: [{ resourceName: "headscale-secrets", resourceKey: "noise_private_key" }],
} as const satisfies Secret
