import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberAbsorbCommunityAddons = {
  id: "01a0de4d-ccf3-7cab-a8bf-2cae7c1c6bd9",
  type: "page-type/initiative",
  slug: "ember-absorb-community-addons",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "What More Markers does, temper-addon-world does.",
      workingMemory:
        "More Markers 2.2.3 is ESOUI file 4266. The source is fetched from https://api.mmoui.com/v3/game/ESO/filedetails/4266.json and read, never installed. The console files are not ported.",
    },
    {
      statement: "What Crutch Alerts does, temper-addon-combat does.",
      workingMemory: "CrutchAlerts 2.26.0 is ESOUI file 3137. The console files are not ported.",
    },
    {
      statement: "What Pithka's Achievement Tracker does, temper-addon-characters does.",
      workingMemory:
        "Pithka's Achievement Tracker 9.17 is ESOUI file 2892. LibQRCode is rewritten into the bundle for the QR tray.",
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
