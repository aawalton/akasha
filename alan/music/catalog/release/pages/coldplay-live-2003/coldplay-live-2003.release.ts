import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayLive2003 = {
  id: "01a0676a-d723-703f-a456-7009313814a3",
  type: "page-type/release",
  slug: "coldplay-live-2003",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2003-11-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3JMOZD2qixTTLRW9I6JuF4",
      externalLink: "https://open.spotify.com/album/3JMOZD2qixTTLRW9I6JuF4",
    },
  ],
  title: "Live 2003",
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
