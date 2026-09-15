import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallANewCreation = {
  id: "01a0676a-d715-7035-a30d-f72aebc4ca69",
  type: "page-type/release",
  slug: "paul-cardall-a-new-creation",
  title: "A New Creation",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 49.627033,
  ownProgress: 49.627033,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-09-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gNjG0ykKG0N9V8LTRS3yX",
      externalLink: "https://open.spotify.com/album/1gNjG0ykKG0N9V8LTRS3yX",
    },
  ],
} as const satisfies Release
