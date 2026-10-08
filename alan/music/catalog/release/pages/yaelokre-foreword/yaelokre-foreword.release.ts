import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const yaelokreForeword = {
  id: "01a0ce87-1026-7aa1-ac05-f3f118db8b46",
  type: "page-type/release",
  slug: "yaelokre-foreword",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/yaelokre"],
  position: 0,
  publishedAt: "2026-09-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "43LxoEXFqx284JqtgZ5goR",
      externalLink: "https://open.spotify.com/album/43LxoEXFqx284JqtgZ5goR",
      lastSyncedAt: "2026-09-23",
    },
  ],
  title: "Foreword",
  createdAt: "2026-09-23T13:49:13.126Z",
  updatedAt: "2026-09-23T14:01:20.000Z",
} as const satisfies Release
