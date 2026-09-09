import type { Secret } from "../secret.page-type.ts"

export const collectionsSecretsSeaweedfsS3Endpoint = {
  id: "01a076b7-a4ae-75e1-abb3-9bace8258839",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-seaweedfs-s3-endpoint",
  placements: [{ resourceName: "collections-secrets", resourceKey: "SEAWEEDFS_S3_ENDPOINT" }],
} as const satisfies Secret
