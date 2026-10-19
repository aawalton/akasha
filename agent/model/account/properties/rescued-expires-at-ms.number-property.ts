import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const rescuedExpiresAtMs = {
  id: "01a0637b-78bb-748c-abf5-487f7793c2a7",
  type: "page-type/number-property",
  slug: "rescued-expires-at-ms",
  propertySlug: "expires-at-ms",
  definition: "the last time the access token of a rescued credential works",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rescued pair is preferred over the committed pair by this number alone.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T18:57:11.355Z",
  updatedAt: "2026-10-19T18:48:38.926Z",
} as const satisfies NumberProperty
