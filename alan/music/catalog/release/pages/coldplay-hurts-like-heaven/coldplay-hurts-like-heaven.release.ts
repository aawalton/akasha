import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayHurtsLikeHeaven = {
  id: "01a0676a-d720-707b-93c3-78e1ed9d8dec",
  type: "page-type/release",
  slug: "coldplay-hurts-like-heaven",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2011-10-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4mTRjo752lDXWzflHdMJh5",
      externalLink: "https://open.spotify.com/album/4mTRjo752lDXWzflHdMJh5",
    },
  ],
  title: "Hurts Like Heaven",
} as const satisfies Release
