import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const workersSecretsSopsAgeKey = {
  id: "01a0a510-6efa-7487-b450-dc88d1e253f6",
  type: "page-type/secret",
  slug: "workers-secrets-sops-age-key",
  placements: [{ resourceName: "workers-secrets", resourceKey: "SOPS_AGE_KEY" }],
} as const satisfies Secret
