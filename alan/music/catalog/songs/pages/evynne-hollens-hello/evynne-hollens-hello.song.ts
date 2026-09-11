import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const evynneHollensHello = {
  id: "019ea4cf-3721-7534-8796-30e99f99837a",
  type: "song",
  slug: "evynne-hollens-hello",
  title: "Hello",
  artist: "evynne-hollens",
  externalId: "59407397-1b56-4ba6-b409-4c427270cc1b",
  externalLink: "https://musicbrainz.org/work/59407397-1b56-4ba6-b409-4c427270cc1b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
