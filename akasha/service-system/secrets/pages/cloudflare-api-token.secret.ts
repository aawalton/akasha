import type { Secret } from "../secret.page-type.ts"

export const cloudflareApiToken = {
  id: "01a06832-cf2d-7b77-944a-9a5e2b62edfe",
  pageTypeSlug: "secret",
  slug: "cloudflare-api-token",
  resourceName: "cloudflare-api-token",
  resourceKey: "api-token",
} as const satisfies Secret
