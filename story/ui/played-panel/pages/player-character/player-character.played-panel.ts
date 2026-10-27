import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const playerCharacter = {
  id: "01a0e81f-b53b-7dba-96d1-85a5175ffc7c",
  type: "page-type/played-panel",
  slug: "player-character",
  definition: "the player character's cover, then the other characters', each over its own sheet",
  code: "tsx",
  drawn: "js",
  place: "panel-place/character",
  position: 10,
  decisions: [
    { decisionKind: "decision-kind/departure", statement: "Clicking the cover opens it whole." },
  ],
  createdAt: "2026-09-28T13:06:27.259Z",
  updatedAt: "2026-10-27T18:38:55.510Z",
} as const satisfies PlayedPanel
