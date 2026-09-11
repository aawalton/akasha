import type { Secret } from "akasha/infrastructure/services/secrets/secret.page-type.types.ts"

export const collectionsSecretsWebhookPassword = {
  id: "01a076b8-4b7a-7e86-8e23-ac0eae44c529",
  type: "secret",
  slug: "collections-secrets-webhook-password",
  placements: [{ resourceName: "collections-secrets", resourceKey: "WEBHOOK_PASSWORD" }],
} as const satisfies Secret
