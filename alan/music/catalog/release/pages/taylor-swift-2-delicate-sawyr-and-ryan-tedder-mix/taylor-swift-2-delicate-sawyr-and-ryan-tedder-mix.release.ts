import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2DelicateSawyrAndRyanTedderMix = {
  id: "01a0676a-d71c-7004-965c-6b3db5cdb8b4",
  type: "page-type/release",
  slug: "taylor-swift-2-delicate-sawyr-and-ryan-tedder-mix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2018-05-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7HEXQkjBNiZilJcTWXwLOA",
      externalLink: "https://open.spotify.com/album/7HEXQkjBNiZilJcTWXwLOA",
    },
  ],
  title: "Delicate (Sawyr And Ryan Tedder Mix)",
} as const satisfies Release
