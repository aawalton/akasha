import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3EasyOnMe = {
  id: "01a0676a-d71c-704d-b8ba-7b3984c16c08",
  type: "page-type/release",
  slug: "the-piano-guys-3-easy-on-me",
  ownLength: 2.9859,
  ownProgress: 2.9859,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2022-01-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5eFNnRq4utDhSqCjbvfJzS",
      externalLink: "https://open.spotify.com/album/5eFNnRq4utDhSqCjbvfJzS",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Easy On Me",
} as const satisfies Release
