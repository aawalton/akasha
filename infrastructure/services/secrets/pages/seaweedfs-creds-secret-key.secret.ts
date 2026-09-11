import type { Secret } from "akasha/infrastructure/services/secrets/secret.page-type.types.ts"

export const seaweedfsCredsSecretKey = {
  id: "01a06832-cf2d-73ba-b6b4-ee0df3a009cd",
  type: "secret",
  slug: "seaweedfs-creds-secret-key",
  placements: [{ resourceName: "seaweedfs-creds", resourceKey: "secret_key" }],
} as const satisfies Secret
