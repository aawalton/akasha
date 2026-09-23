import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2LavenderHazeAcousticVersion = {
  id: "01a0676a-d722-7062-94d5-4442380a40ad",
  type: "page-type/release",
  slug: "taylor-swift-2-lavender-haze-acoustic-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2023-03-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6eKdbTio5viiwJ5FE5J8wU",
      externalLink: "https://open.spotify.com/album/6eKdbTio5viiwJ5FE5J8wU",
    },
  ],
  title: "Lavender Haze (Acoustic Version)",
} as const satisfies Release
