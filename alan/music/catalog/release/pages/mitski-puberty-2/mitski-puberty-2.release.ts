import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const mitskiPuberty2 = {
  id: "01a0676a-d727-7032-8b3f-8a445897445d",
  type: "page-type/release",
  slug: "mitski-puberty-2",
  title: "Puberty 2",
  partOfCollections: ["artist/mitski"],
  position: 0,
  ownLength: 31.432533,
  ownProgress: 31.432533,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2016-06-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Coa8Eb9SzjrkwWEom963Q",
      externalLink: "https://open.spotify.com/album/4Coa8Eb9SzjrkwWEom963Q",
    },
  ],
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
