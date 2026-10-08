import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberTemperAlpha = {
  id: "01a0de4d-ccf3-7cab-a8bf-2cae7c1c6bd9",
  type: "page-type/initiative",
  slug: "ember-temper-alpha",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "A player besides Alan plays with the Temper addons.",
      workingMemory:
        "Anyone can download temper-addons.zip at https://tempereso.com/api/addons/download without signing in. The zip holds Temper, TemperCatalog, TemperCharacters, TemperCombat, TemperItems and TemperWorld, and needs no addon outside it. The landing page at tempereso.com explains the setup. Sign-up is Google-only through alanwalton.com, and no limit on who signs up was found in the code; no fresh Google account has tried it. No alpha user is named yet.",
    },
  ],
  constraints: [
    "The interface of Pithka's Achievement Tracker in Temper is identical to the upstream interface.",
    "The interface of Combat Metrics in Temper is identical to the upstream interface.",
  ],
} as const satisfies Initiative
