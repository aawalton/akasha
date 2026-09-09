import type { Secret } from "../secret.page-type.ts"

export const alanwaltonSecretsTelnyxPublicKey = {
  id: "01a076d8-38be-7503-85a3-c2f8302069cb",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "alanwalton-secrets-telnyx-public-key",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "TELNYX_PUBLIC_KEY" }],
} as const satisfies Secret
