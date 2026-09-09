import type { Secret } from "../secret.page-type.ts"

export const lokiS3CredsSecretKey = {
  id: "01a082fc-5366-7a29-8063-3ba10a8dd4c2",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "loki-s3-creds-secret-key",
  placements: [{ resourceName: "loki-s3-creds", resourceKey: "secret_key" }],
} as const satisfies Secret
