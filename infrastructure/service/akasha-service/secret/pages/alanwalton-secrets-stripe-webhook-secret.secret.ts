import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsStripeWebhookSecret = {
  id: "01a0ba97-a230-7b28-a903-a221260e726a",
  type: "page-type/secret",
  slug: "alanwalton-secrets-stripe-webhook-secret",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "STRIPE_WEBHOOK_SECRET" }],
  createdAt: "2026-09-19T16:54:54.768Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
