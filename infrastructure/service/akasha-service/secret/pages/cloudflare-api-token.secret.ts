import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const cloudflareApiToken = {
  id: "01a06832-cf2d-7b77-944a-9a5e2b62edfe",
  type: "page-type/secret",
  slug: "cloudflare-api-token",
  placements: [{ resourceName: "cloudflare-api-token", resourceKey: "api-token" }],
  createdAt: "2026-09-03T16:55:55.437Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
