import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const sceneCover = {
  id: "01a0e7ff-1168-797c-8a26-c0ae6e03e8e5",
  type: "page-type/played-panel",
  slug: "scene-cover",
  definition: "the scenes pictured in a written chapter, paged through in order",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
  position: 30,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Clicking the picture opens it whole, with its reroll over it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every turn's cover and every chapter's scene is drawn in its prose rather than here.",
    },
  ],
} as const satisfies PlayedPanel
