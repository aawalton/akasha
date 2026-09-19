import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayIBloomBlaum = {
  id: "01a0ba5d-4098-7901-a5ac-74f8fac24992",
  type: "page-type/song",
  slug: "coldplay-i-bloom-blaum",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "85769334-407f-4a55-8946-4ad042247e2f",
      externalLink: "https://musicbrainz.org/work/85769334-407f-4a55-8946-4ad042247e2f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Bloom Blaum",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
