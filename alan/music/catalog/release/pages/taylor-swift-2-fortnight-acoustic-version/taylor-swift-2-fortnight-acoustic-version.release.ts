import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2FortnightAcousticVersion = {
  id: "01a0676a-d71e-7030-b356-8b19ff8e3e3f",
  type: "page-type/release",
  slug: "taylor-swift-2-fortnight-acoustic-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2024-07-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5IYMYmX28qpI6OEnQhdazX",
      externalLink: "https://open.spotify.com/album/5IYMYmX28qpI6OEnQhdazX",
    },
  ],
  title: "Fortnight (Acoustic Version)",
} as const satisfies Release
