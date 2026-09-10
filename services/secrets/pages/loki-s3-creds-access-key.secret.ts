import type { Secret } from "../secret.page-type.types.ts"

export const lokiS3CredsAccessKey = {
  id: "01a082fc-4474-706e-a28b-b8d9b492ec4f",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "loki-s3-creds-access-key",
  placements: [{ resourceName: "loki-s3-creds", resourceKey: "access_key" }],
} as const satisfies Secret
