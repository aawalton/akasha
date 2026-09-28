import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const otherwherePlayerCharacter = {
  id: "01a0e81f-b53b-713a-a982-cd2e49fd35ad",
  type: "page-type/played-panel",
  slug: "otherwhere-player-character",
  definition: "Otherwhere's player character: name, cover, then a sheet that shows no stats",
  code: "tsx",
  drawn: "js",
  place: "panel-place/aside",
  position: 11,
  decisions: [
    { decisionKind: "decision-kind/departure", statement: "Clicking the cover opens it whole." },
  ],
} as const satisfies PlayedPanel
