import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const playerCharacter = {
  id: "01a0e81f-b53b-7dba-96d1-85a5175ffc7c",
  type: "page-type/played-panel",
  slug: "player-character",
  definition: "the player character's cover, then the other characters', for a game with no sheet",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
  position: 10,
  decisions: [
    { decisionKind: "decision-kind/departure", statement: "Clicking the cover opens it whole." },
  ],
} as const satisfies PlayedPanel
