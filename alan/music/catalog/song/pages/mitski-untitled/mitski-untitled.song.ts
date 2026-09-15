import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiUntitled = {
  id: "019f0ea8-e5a9-7822-8e40-159532478020",
  type: "page-type/song",
  slug: "mitski-untitled",
  title: "グライド",
  artist: "artist/mitski",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "202029e0-8dd3-3ddd-8366-dd29dbb2ebef",
      externalLink: "https://musicbrainz.org/work/202029e0-8dd3-3ddd-8366-dd29dbb2ebef",
      lastSyncedAt: "2026-06-28",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
