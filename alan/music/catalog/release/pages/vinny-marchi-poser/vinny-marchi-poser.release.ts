import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiPoser = {
  id: "01a0676a-d727-7009-baaa-c4c054c32e29",
  type: "page-type/release",
  slug: "vinny-marchi-poser",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-06-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2O9259mgFe2qwhPJ4eZHW6",
      externalLink: "https://open.spotify.com/album/2O9259mgFe2qwhPJ4eZHW6",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "POSER",
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
