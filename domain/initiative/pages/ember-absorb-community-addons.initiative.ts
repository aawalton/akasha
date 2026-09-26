import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberAbsorbCommunityAddons = {
  id: "01a0de4d-ccf3-7cab-a8bf-2cae7c1c6bd9",
  type: "page-type/initiative",
  slug: "ember-absorb-community-addons",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "Temper holds the upstream source of the four addons this initiative absorbs.",
      workingMemory:
        "The four addons are More Markers, Crutch Alerts, Pithka's Achievement Tracker and Combat Metrics. Each is on ESOUI. The modules of temper-addon-community fetch an addon from ESOUI. The source is read, and nothing of it is installed beside Temper.",
    },
    {
      statement: "What More Markers does, a Temper addon does.",
    },
    {
      statement: "What Crutch Alerts does, a Temper addon does.",
    },
    {
      statement: "What Pithka's Achievement Tracker does, a Temper addon does.",
    },
    {
      statement: "What Combat Metrics does, temper-addon-combat does.",
      workingMemory:
        "temper-addon-combat is a port of Combat Metrics already. Its manifest says so. What is left is whatever that port differs from upstream in.",
    },
    {
      statement: "Alan plays with none of the four addons installed.",
    },
  ],
  constraints: [
    "The interface of Pithka's Achievement Tracker in Temper is identical to the upstream interface.",
    "The interface of Combat Metrics in Temper is identical to the upstream interface.",
  ],
} as const satisfies Initiative
