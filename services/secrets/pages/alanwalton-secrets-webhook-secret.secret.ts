import type { Secret } from "../secret.page-type.ts"

export const alanwaltonSecretsWebhookSecret = {
  id: "01a076d8-38bf-7ea8-b5be-c89540356ac4",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "alanwalton-secrets-webhook-secret",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "WEBHOOK_SECRET" }],
} as const satisfies Secret
