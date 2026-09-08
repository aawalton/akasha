import type { Secret } from "../secret.page-type.ts"

export const pgbouncerTlsTlsCrt = {
  id: "01a0768e-cc96-7b21-8675-3a9dc428f472",
  pageTypeSlug: "secret",
  slug: "pgbouncer-tls-tls-crt",
  placements: [{ resourceName: "pgbouncer-tls", resourceKey: "tls.crt" }],
} as const satisfies Secret
