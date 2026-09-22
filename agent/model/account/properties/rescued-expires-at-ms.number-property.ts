import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const rescuedExpiresAtMs = {
  id: "01a0637b-78bb-748c-abf5-487f7793c2a7",
  type: "page-type/number-property",
  slug: "rescued-expires-at-ms",
  propertySlug: "expires-at-ms",
  definition: "the milliseconds since the epoch at which a rescued access token expires",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rescued pair is preferred over the committed pair by this number alone.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
