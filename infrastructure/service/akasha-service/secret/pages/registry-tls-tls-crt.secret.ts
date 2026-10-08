import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const registryTlsTlsCrt = {
  id: "01a07697-b9c0-7a95-ba69-384559b7559c",
  type: "page-type/secret",
  slug: "registry-tls-tls-crt",
  placements: [{ resourceName: "registry-tls", resourceKey: "tls.crt" }],
  createdAt: "2026-09-06T12:00:50.112Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
