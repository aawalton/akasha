import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const nextBossLayout = {
  id: "01a06157-835b-7886-981b-c885f8cbe8e7",
  pageTypeSlug: "eso-interface",
  slug: "next-boss-layout",
  definition: "the timetable window and the district labels drawn over the Imperial City map",
  markup: "xml",
  loadedAs: "TemperEvents.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The timetable window is one label of names beside one label of times.",
    },
    {
      invariantKind: "departure",
      statement: "The map labels are anchored to the middle of the screen rather than to the map.",
    },
    {
      invariantKind: "departure",
      statement: "The window's width is set from a string id rather than stated here.",
    },
    {
      invariantKind: "departure",
      statement: "Dragging the window calls back into the tracker so the place is kept.",
    },
  ],
} as const satisfies EsoInterface
