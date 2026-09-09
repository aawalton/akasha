import type { Secret } from "../secret.page-type.ts"

export const alanwaltonS3CredsAccessKey = {
  id: "01a082fc-07fd-7fac-8201-6934cbaf67bf",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "alanwalton-s3-creds-access-key",
  placements: [{ resourceName: "alanwalton-s3-creds", resourceKey: "access_key" }],
} as const satisfies Secret
