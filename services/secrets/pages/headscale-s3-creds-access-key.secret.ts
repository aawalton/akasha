import type { Secret } from "../secret.page-type.ts"

export const headscaleS3CredsAccessKey = {
  id: "01a082fc-62b7-7663-ac74-2b6b9cb277cb",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "headscale-s3-creds-access-key",
  placements: [{ resourceName: "headscale-s3-creds", resourceKey: "access_key" }],
} as const satisfies Secret
