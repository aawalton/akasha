import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberAbsorbCommunityAddons = {
  id: "01a0de4d-ccf3-7cab-a8bf-2cae7c1c6bd9",
  type: "page-type/initiative",
  slug: "ember-absorb-community-addons",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [],
  constraints: [
    "The interface of Pithka's Achievement Tracker in Temper is identical to the upstream interface.",
    "The interface of Combat Metrics in Temper is identical to the upstream interface.",
  ],
} as const satisfies Initiative
