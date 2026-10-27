import type { PlayedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.types.ts"

export const otherwhereTheLibraryPlayerCharacter = {
  id: "01a0e81f-b53b-713a-a982-cd2e49fd35ad",
  type: "page-type/played-panel",
  slug: "otherwhere-the-library-player-character",
  definition: "Otherwhere's player character with a sheet without bonds, then the other characters",
  code: "tsx",
  drawn: "js",
  place: "panel-place/character",
  position: 11,
  decisions: [
    { decisionKind: "decision-kind/departure", statement: "Clicking the cover opens it whole." },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The sheet shows stats once the story has shown a stat, resource, species, class or status.",
    },
  ],
  createdAt: "2026-09-28T13:06:27.259Z",
  updatedAt: "2026-10-27T18:38:55.510Z",
} as const satisfies PlayedPanel
