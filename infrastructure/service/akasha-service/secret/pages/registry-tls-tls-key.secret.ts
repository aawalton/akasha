import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const registryTlsTlsKey = {
  id: "01a07697-d73c-7497-a3fd-a6662c7795a5",
  type: "page-type/secret",
  slug: "registry-tls-tls-key",
  placements: [{ resourceName: "registry-tls", resourceKey: "tls.key" }],
  createdAt: "2026-09-06T12:00:57.660Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
