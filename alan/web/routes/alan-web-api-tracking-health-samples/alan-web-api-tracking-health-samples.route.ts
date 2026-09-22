import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebApiTrackingHealthSamples = {
  id: "01a08835-7148-7ce8-968b-e46434e1f048",
  type: "page-type/route",
  slug: "alan-web-api-tracking-health-samples",
  definition: "the health samples a device sends",
  code: "ts",
  urlPath: "api/tracking/health-samples",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sender is known by its device secret rather than by a session.",
    },
  ],
} as const satisfies Route
