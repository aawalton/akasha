import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallANewCreation = {
  id: "01a0676a-d715-7035-a30d-f72aebc4ca69",
  type: "page-type/release",
  slug: "paul-cardall-a-new-creation",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2016-09-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gNjG0ykKG0N9V8LTRS3yX",
      externalLink: "https://open.spotify.com/album/1gNjG0ykKG0N9V8LTRS3yX",
    },
  ],
  title: "A New Creation",
  createdAt: "2026-09-03T13:17:30.261Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
