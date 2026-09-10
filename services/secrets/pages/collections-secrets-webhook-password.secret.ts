import type { Secret } from "../secret.page-type.types.ts"

export const collectionsSecretsWebhookPassword = {
  id: "01a076b8-4b7a-7e86-8e23-ac0eae44c529",
  pageTypeSlug: "secret",
  type: "secret",
  slug: "collections-secrets-webhook-password",
  placements: [{ resourceName: "collections-secrets", resourceKey: "WEBHOOK_PASSWORD" }],
} as const satisfies Secret
