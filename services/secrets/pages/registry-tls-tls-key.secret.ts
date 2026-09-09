import type { Secret } from "../secret.page-type.ts"

export const registryTlsTlsKey = {
  id: "01a07697-d73c-7497-a3fd-a6662c7795a5",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "registry-tls-tls-key",
  placements: [{ resourceName: "registry-tls", resourceKey: "tls.key" }],
} as const satisfies Secret
