import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiUntitled = {
  id: "019f0ea8-e5a9-7822-8e40-159532478020",
  type: "page-type/song",
  slug: "mitski-untitled",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "202029e0-8dd3-3ddd-8366-dd29dbb2ebef",
      externalLink: "https://musicbrainz.org/work/202029e0-8dd3-3ddd-8366-dd29dbb2ebef",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "グライド",
  artist: "artist/mitski",
  performed: true,
  createdAt: "2026-06-28T14:36:17.705Z",
  updatedAt: "2026-09-19T17:05:22.000Z",
} as const satisfies Song
