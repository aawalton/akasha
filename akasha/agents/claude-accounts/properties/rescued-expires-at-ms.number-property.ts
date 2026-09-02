import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RescuedExpiresAtMs = number

export const rescuedExpiresAtMs = {
  id: "01a0637b-78bb-748c-abf5-487f7793c2a7",
  pageTypeSlug: "number-property",
  slug: "rescued-expires-at-ms",
  propertySlug: "expires-at-ms",
  definition: "the milliseconds since the epoch a rescued access token expires at",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rescued pair is preferred over the committed pair by this number alone.",
    },
  ],
} as const satisfies NumberProperty
