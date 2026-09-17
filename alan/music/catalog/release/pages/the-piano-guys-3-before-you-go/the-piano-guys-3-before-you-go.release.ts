import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3BeforeYouGo = {
  id: "01a0676a-d718-7035-85d0-6db06fb5d8c2",
  type: "page-type/release",
  slug: "the-piano-guys-3-before-you-go",
  ownLength: 3.8839166666666665,
  ownProgress: 3.883917,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2021-06-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4iWfZFYBbW4OKatZKpWXQO",
      externalLink: "https://open.spotify.com/album/4iWfZFYBbW4OKatZKpWXQO",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Before You Go",
} as const satisfies Release
