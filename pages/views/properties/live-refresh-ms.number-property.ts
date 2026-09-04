import type { NumberProperty } from "@akasha/pages-system/number-property"

export type LiveRefreshMs = number

export const liveRefreshMs = {
  id: "01a0680d-4d00-7013-9a16-8c4b2d7e4114",
  pageTypeSlug: "number-property",
  slug: "live-refresh-ms",
  propertySlug: "live-refresh-ms",
  definition: "how often in milliseconds a view redraws itself",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A view stating nothing redraws only when what it draws changes.",
    },
  ],
} as const satisfies NumberProperty
