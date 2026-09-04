import type { Secret } from "../secret.page-type.ts"

export const seaweedfsCredsSecretKey = {
  id: "01a06832-cf2d-73ba-b6b4-ee0df3a009cd",
  pageTypeSlug: "secret",
  slug: "seaweedfs-creds-secret-key",
  resourceName: "seaweedfs-creds",
  resourceKey: "secret_key",
} as const satisfies Secret
