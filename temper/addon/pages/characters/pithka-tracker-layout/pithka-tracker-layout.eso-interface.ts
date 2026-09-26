import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const pithkaTrackerLayout = {
  id: "01a0dea5-6b22-7c10-bc67-9f177162813d",
  type: "page-type/eso-interface",
  slug: "pithka-tracker-layout",
  definition: "the achievement tracker window, its nav panel, QR tray and searching pulse",
  markup: "xml",
  loadedAs: "TemperCharactersPithkaTracker.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The markup is Pithka's Achievement Tracker's own, with only its global names renamed.",
    },
  ],
} as const satisfies EsoInterface
