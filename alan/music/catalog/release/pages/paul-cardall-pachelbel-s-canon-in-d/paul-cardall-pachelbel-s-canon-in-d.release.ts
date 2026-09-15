import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallPachelbelSCanonInD = {
  id: "01a0676a-d726-7057-963e-468663da93bb",
  type: "page-type/release",
  slug: "paul-cardall-pachelbel-s-canon-in-d",
  title: "Pachelbel's Canon in D",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 3.23705,
  ownProgress: 3.23705,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-06-06",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1N0GqM12n5Q6UReBGABubZ",
      externalLink: "https://open.spotify.com/album/1N0GqM12n5Q6UReBGABubZ",
    },
  ],
} as const satisfies Release
