import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3RollingInTheDeep = {
  id: "01a0676a-d728-701c-9a82-b6b801c61a7f",
  type: "page-type/release",
  slug: "the-piano-guys-3-rolling-in-the-deep",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2012-09-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Jy7wRJN7Y0msbgYnw9NrO",
      externalLink: "https://open.spotify.com/album/2Jy7wRJN7Y0msbgYnw9NrO",
    },
  ],
  title: "Rolling in the Deep",
} as const satisfies Release
