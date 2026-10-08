import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberAbsorbCommunityAddons = {
  id: "01a0de4d-ccf3-7cab-a8bf-2cae7c1c6bd9",
  type: "page-type/initiative",
  slug: "ember-absorb-community-addons",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "What Pithka's Achievement Tracker does, temper-addon-characters does.",
      workingMemory:
        "Pithka's Achievement Tracker 9.17 is ESOUI file 2892. The port is every pithka module of temper-addon-characters and is deployed. Left is seeing in game the completion icons, the QR tray and the trial scores, which the pictures showed locked, missing and blank.",
    },
    {
      statement: "What Combat Metrics does, temper-addon-combat does.",
      workingMemory:
        "Combat Metrics 1.7.8 is ESOUI file 1360. The markup, the art and the fonts match upstream. Left is seeing a recorded fight in the report: the rows, the bars, the graph and the menus.",
    },
  ],
  constraints: [
    "The interface of Pithka's Achievement Tracker in Temper is identical to the upstream interface.",
    "The interface of Combat Metrics in Temper is identical to the upstream interface.",
  ],
} as const satisfies Initiative
