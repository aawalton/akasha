import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayReignOfLove = {
  id: "01a0ba60-f736-7e94-9c9f-2575725aed37",
  type: "page-type/song",
  slug: "coldplay-reign-of-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ad2b51d4-4109-4bac-9532-922908c29e0f",
      externalLink: "https://musicbrainz.org/work/ad2b51d4-4109-4bac-9532-922908c29e0f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Reign of Love",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
