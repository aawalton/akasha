import type { Secret } from "../secret.page-type.types.ts"

export const headscaleS3CredsSecretKey = {
  id: "01a082fc-72f6-7b09-9e09-ae96b85b31c6",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "headscale-s3-creds-secret-key",
  placements: [{ resourceName: "headscale-s3-creds", resourceKey: "secret_key" }],
} as const satisfies Secret
