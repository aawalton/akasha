import type { Secret } from "../secret.page-type.types.ts"

export const collectionsSecretsWebhookUsername = {
  id: "01a076b8-60fb-700b-bf69-142fb3ce0222",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-webhook-username",
  placements: [{ resourceName: "collections-secrets", resourceKey: "WEBHOOK_USERNAME" }],
} as const satisfies Secret
