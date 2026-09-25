import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const nextBossLayout = {
  id: "01a06157-835b-7886-981b-c885f8cbe8e7",
  type: "page-type/eso-interface",
  slug: "next-boss-layout",
  definition: "the timetable window and the district labels drawn over the Imperial City map",
  markup: "xml",
  loadedAs: "NextBoss.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The timetable window is one label of names beside one label of times.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The map labels are anchored to the middle of the screen rather than to the map.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window's width is set from a string id rather than stated here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dragging the window calls back into the tracker so the place is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The timetable names districts as shadowed body text and times as shadowed numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The timetable has no backdrop, and its text is padded as a stat row is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The map labels sit in the game's own map scene, so they keep the game's font.",
    },
  ],
} as const satisfies EsoInterface
