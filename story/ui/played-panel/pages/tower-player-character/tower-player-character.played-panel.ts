import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const towerPlayerCharacter = {
  id: "01a0e81e-5023-74e7-b569-9edb68b86b81",
  type: "page-type/played-panel",
  slug: "tower-player-character",
  definition:
    "the Tower's player character: name, then sheet, with the derived numbers the Tower works",
  code: "tsx",
  drawn: "js",
  place: "panel-place/character",
  position: 12,
  decisions: [
    { decisionKind: "decision-kind/departure", statement: "Clicking the cover opens it whole." },
  ],
  createdAt: "2026-09-28T13:04:55.843Z",
  updatedAt: "2026-10-27T18:38:55.510Z",
} as const satisfies PlayedPanel
