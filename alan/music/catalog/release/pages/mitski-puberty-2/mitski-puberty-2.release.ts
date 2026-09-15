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
  rank: "C",
  publishedAt: "2016-06-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Coa8Eb9SzjrkwWEom963Q",
      externalLink: "https://open.spotify.com/album/4Coa8Eb9SzjrkwWEom963Q",
    },
  ],
} as const satisfies Release
