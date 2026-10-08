import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallSacredPiano = {
  id: "01a0676a-d728-7038-8857-9fd530baa02d",
  type: "page-type/release",
  slug: "paul-cardall-sacred-piano",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2009-08-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3D82z6ou9OTYQHFrQwUb2j",
      externalLink: "https://open.spotify.com/album/3D82z6ou9OTYQHFrQwUb2j",
    },
  ],
  title: "Sacred Piano",
  createdAt: "2026-09-03T13:17:30.280Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
