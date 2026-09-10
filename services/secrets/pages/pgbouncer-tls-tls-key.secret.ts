import type { Secret } from "../secret.page-type.types.ts"

export const pgbouncerTlsTlsKey = {
  id: "01a0768e-dcfa-76ec-8099-20de33c43eab",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "pgbouncer-tls-tls-key",
  placements: [{ resourceName: "pgbouncer-tls", resourceKey: "tls.key" }],
} as const satisfies Secret
