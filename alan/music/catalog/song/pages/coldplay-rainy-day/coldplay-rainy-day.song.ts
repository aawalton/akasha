import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayRainyDay = {
  id: "01a0ba60-fca9-77a1-bfe4-8177e2285e59",
  type: "page-type/song",
  slug: "coldplay-rainy-day",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e453aff7-e721-3257-926f-21ed077e17cf",
      externalLink: "https://musicbrainz.org/work/e453aff7-e721-3257-926f-21ed077e17cf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rainy Day",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
