import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayXY = {
  id: "01a0ba60-ffc9-70f1-8209-8761acabd433",
  type: "page-type/song",
  slug: "coldplay-x-y",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bfb4c42d-c6eb-3b53-883c-df9a849a0d30",
      externalLink: "https://musicbrainz.org/work/bfb4c42d-c6eb-3b53-883c-df9a849a0d30",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "X&Y",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
