import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const weirdAlYankovic2PolkaParty = {
  id: "01a0676a-d727-7001-9d59-141bc43fb12d",
  type: "page-type/release",
  slug: "weird-al-yankovic-2-polka-party",
  title: "Polka Party",
  partOfCollections: ["artist/weird-al-yankovic"],
  position: 0,
  ownLength: 34.09615,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1986-10-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3cn1jehwLTYqxT4tS1qiug",
      externalLink: "https://open.spotify.com/album/3cn1jehwLTYqxT4tS1qiug",
    },
  ],
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-15T16:40:16.000Z",
} as const satisfies Release
