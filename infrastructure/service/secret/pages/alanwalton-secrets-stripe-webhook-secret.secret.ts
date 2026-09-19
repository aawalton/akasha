import type { Secret } from "akasha/infrastructure/service/secret/secret.page-type.types.ts"

export const alanwaltonSecretsStripeWebhookSecret = {
  id: "01a0ba97-a230-7b28-a903-a221260e726a",
  type: "page-type/secret",
  slug: "alanwalton-secrets-stripe-webhook-secret",
  placements: [{ resourceName: "alanwalton-secrets", resourceKey: "STRIPE_WEBHOOK_SECRET" }],
} as const satisfies Secret
