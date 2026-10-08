import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraWrangelIsland = {
  id: "019ea4a7-ea60-743b-b52a-2c90667ee78f",
  type: "page-type/song",
  slug: "aurora-wrangel-island",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5366d8bc-bece-49ea-af40-d539f7e7016b",
      externalLink: "https://musicbrainz.org/work/5366d8bc-bece-49ea-af40-d539f7e7016b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wrangel Island",
  artist: "artist/aurora",
  performed: true,
  createdAt: "2026-06-08T00:35:28.480Z",
  updatedAt: "2026-09-19T16:57:09.000Z",
} as const satisfies Song
