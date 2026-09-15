import type { Secret } from "akasha/infrastructure/service/secret/secret.page-type.types.ts"

export const collectionsSecretsSeaweedfsBucket = {
  id: "01a076b7-92cf-733e-b55e-b0009460c1db",
  type: "page-type/secret",
  slug: "collections-secrets-seaweedfs-bucket",
  placements: [{ resourceName: "collections-secrets", resourceKey: "SEAWEEDFS_BUCKET" }],
} as const satisfies Secret
