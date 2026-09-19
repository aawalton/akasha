import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplay136 = {
  id: "01a0ba5d-48b2-70a6-b25a-f45fab796ad9",
  type: "page-type/song",
  slug: "coldplay-1-36",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dfddf3a5-2f5c-4e0c-8400-935ac9e6b6b6",
      externalLink: "https://musicbrainz.org/work/dfddf3a5-2f5c-4e0c-8400-935ac9e6b6b6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "1.36",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
