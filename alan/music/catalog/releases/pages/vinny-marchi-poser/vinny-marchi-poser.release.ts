import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const vinnyMarchiPoser = {
  id: "01a0676a-d727-7009-baaa-c4c054c32e29",
  type: "release",
  slug: "vinny-marchi-poser",
  title: "POSER",
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  ownLength: 2.730133,
  ownProgress: 2.730133,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-06-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2O9259mgFe2qwhPJ4eZHW6",
      externalLink: "https://open.spotify.com/album/2O9259mgFe2qwhPJ4eZHW6",
      lastSyncedAt: "2025-10-24",
    },
  ],
} as const satisfies Release
