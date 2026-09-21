import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const musicalTheaterWickedTheSoundtrack = {
  id: "01a0676a-d731-701a-8c19-5277238d1458",
  type: "page-type/release",
  slug: "musical-theater-wicked-the-soundtrack",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["release-collection/musical-theater"],
  position: 0,
  publishedAt: "2024-11-22",
  rank: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3JUrJP460nFIqwjxM19slT",
      externalLink: "https://open.spotify.com/album/3JUrJP460nFIqwjxM19slT",
      lastSyncedAt: "2026-01-08",
    },
  ],
  title: "Wicked: The Soundtrack",
} as const satisfies Release
