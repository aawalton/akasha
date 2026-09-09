import type { Route } from "@akasha/code/route"

export const alanWebApiTrackingHealthSamples = {
  id: "01a08835-7148-7ce8-968b-e46434e1f048",
  pageTypeSlug: "route",
  type: "route",
  slug: "alan-web-api-tracking-health-samples",
  definition: "the health samples a device sends in",
  code: "ts",
  urlPath: "api/tracking/health-samples",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sender is known by its device secret rather than by a session.",
    },
  ],
} as const satisfies Route
