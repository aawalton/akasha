import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAdventureOfALifetime = {
  id: "01a0ba5d-4128-7af4-82f5-b9d47e1d2910",
  type: "page-type/song",
  slug: "coldplay-adventure-of-a-lifetime",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "89c8129a-c405-4726-a942-875d8f8a8acc",
      externalLink: "https://musicbrainz.org/work/89c8129a-c405-4726-a942-875d8f8a8acc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Adventure of a Lifetime",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
