import type { Secret } from "../secret.page-type.ts"

export const registryTlsTlsCrt = {
  id: "01a07697-b9c0-7a95-ba69-384559b7559c",
  pageTypeSlug: "secret",
  slug: "registry-tls-tls-crt",
  placements: [{ resourceName: "registry-tls", resourceKey: "tls.crt" }],
} as const satisfies Secret
