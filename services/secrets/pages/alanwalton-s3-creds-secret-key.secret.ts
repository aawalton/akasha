import type { Secret } from "../secret.page-type.ts"

export const alanwaltonS3CredsSecretKey = {
  id: "01a082fc-1720-73cf-85b1-3148e0d48540",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "alanwalton-s3-creds-secret-key",
  placements: [{ resourceName: "alanwalton-s3-creds", resourceKey: "secret_key" }],
} as const satisfies Secret
