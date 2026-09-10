import type { Secret } from "../secret.page-type.types.ts"

export const alanwaltonSecretsReadingRelaySecret = {
  id: "01a076d8-38bd-73ac-82e0-6c3bbbf22748",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "alanwalton-secrets-reading-relay-secret",
  placements: [
    { resourceName: "alanwalton-secrets", resourceKey: "READING_RELAY_SECRET" },
    { resourceName: "smilingjenny-secrets", resourceKey: "READING_RELAY_SECRET" },
  ],
} as const satisfies Secret
