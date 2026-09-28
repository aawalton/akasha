import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const sceneCover = {
  id: "01a0e7ff-1168-797c-8a26-c0ae6e03e8e5",
  type: "page-type/played-panel",
  slug: "scene-cover",
  definition: "the cover of the latest turn of play, paged back through earlier turns",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
  position: 30,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Clicking the picture opens it whole, with its reroll over it.",
    },
  ],
} as const satisfies PlayedPanel
