import type { TextProperty } from "@akasha/pages/text-property"

export type TiCleanBlockedReason = string

export const tiCleanBlockedReason = {
  id: "01a0819e-62fa-71d4-9b29-5683cd0211ea",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "ti-clean-blocked-reason",
  propertySlug: "ti-clean-blocked-reason",
  definition: "what keeps an addon from reaching ti-clean",
  maxLength: 1000,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon naming a reason here is blocked rather than backlog.",
    },
    {
      invariantKind: "departure",
      statement: "A reason names the call sites the addon cannot convert.",
    },
  ],
} as const satisfies TextProperty
