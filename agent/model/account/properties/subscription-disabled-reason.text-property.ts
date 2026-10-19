import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const subscriptionDisabledReason = {
  id: "01a054d8-1d39-7c38-bbf0-00a17589572e",
  type: "page-type/text-property",
  slug: "subscription-disabled-reason",
  propertySlug: "subscription-disabled-reason",
  definition: "what a subscription is stopped by",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An account stating a subscription disabled reason is passed over by every pass that renews a token.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The account is usable again once this reason is taken away.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T22:44:04.537Z",
  updatedAt: "2026-10-19T18:52:06.536Z",
} as const satisfies TextProperty
