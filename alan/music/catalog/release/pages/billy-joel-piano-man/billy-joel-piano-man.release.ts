import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelPianoMan = {
  id: "01a0676a-d726-7079-a321-b376e02dc02d",
  type: "page-type/release",
  slug: "billy-joel-piano-man",
  title: "Piano Man",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 43.299067,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1973-11-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "77ErLrVvYETIlQJHAwhfIH",
      externalLink: "https://open.spotify.com/album/77ErLrVvYETIlQJHAwhfIH",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-15T16:34:19.000Z",
} as const satisfies Release
