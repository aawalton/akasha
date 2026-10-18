import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kellyClarksonBrokenBeautiful = {
  id: "01a0676a-d719-703a-92fb-5e1a0ef20a19",
  type: "page-type/release",
  slug: "kelly-clarkson-broken-beautiful",
  title: "Broken & Beautiful",
  partOfCollections: ["artist/kelly-clarkson"],
  position: 0,
  ownLength: 3.6491333333333333,
  ownProgress: 3.649133,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-03-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5UHs9Jq0Vy5E3eUdkgcZvj",
      externalLink: "https://open.spotify.com/album/5UHs9Jq0Vy5E3eUdkgcZvj",
      lastSyncedAt: "2026-02-13",
    },
  ],
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Release
