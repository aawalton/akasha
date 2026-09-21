import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3AMillionDreams = {
  id: "01a0676a-d715-7032-8b3c-7bb7cdf70a67",
  type: "page-type/release",
  slug: "the-piano-guys-3-a-million-dreams",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2018-03-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0sj2cr7lXdkxL1OYGxZedU",
      externalLink: "https://open.spotify.com/album/0sj2cr7lXdkxL1OYGxZedU",
    },
  ],
  title: "A Million Dreams",
} as const satisfies Release
