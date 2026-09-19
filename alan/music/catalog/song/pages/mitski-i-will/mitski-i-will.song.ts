import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiIWill = {
  id: "019f0ea5-8737-730b-93b6-06edd77124f1",
  type: "page-type/song",
  slug: "mitski-i-will",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b6b123f5-6f7d-4d88-bd90-f4b376f534bf",
      externalLink: "https://musicbrainz.org/work/b6b123f5-6f7d-4d88-bd90-f4b376f534bf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Will",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
