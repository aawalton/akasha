import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const workersSecretsSopsAgeKey = {
  id: "01a0a510-6efa-7487-b450-dc88d1e253f6",
  type: "page-type/secret",
  slug: "workers-secrets-sops-age-key",
  placements: [{ resourceName: "workers-secrets", resourceKey: "SOPS_AGE_KEY" }],
  createdAt: "2026-09-15T12:35:12.762Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
