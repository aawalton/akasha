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
      statement: "The markup is Pithka's Achievement Tracker's own, with its global names renamed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window's frame, title and close are the shared window frame's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The nav panel and the QR tray are painted as windows of their own.",
    },
  ],
  createdAt: "2026-09-26T16:56:17.954Z",
  updatedAt: "2026-10-18T20:08:18.328Z",
} as const satisfies EsoInterface
