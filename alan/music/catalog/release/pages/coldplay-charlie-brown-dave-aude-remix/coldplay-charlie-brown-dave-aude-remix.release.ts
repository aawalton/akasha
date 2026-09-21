import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayCharlieBrownDaveAudeRemix = {
  id: "01a0676a-d71a-701b-a2b3-aba11c501b42",
  type: "page-type/release",
  slug: "coldplay-charlie-brown-dave-aude-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2012-02-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5VeBLqypDgNfRglTd4kGGK",
      externalLink: "https://open.spotify.com/album/5VeBLqypDgNfRglTd4kGGK",
    },
  ],
  title: "Charlie Brown (Dave Audé Remix)",
} as const satisfies Release
