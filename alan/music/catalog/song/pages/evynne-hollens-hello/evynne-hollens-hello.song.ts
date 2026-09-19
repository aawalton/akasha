import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const evynneHollensHello = {
  id: "019ea4cf-3721-7534-8796-30e99f99837a",
  type: "page-type/song",
  slug: "evynne-hollens-hello",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "59407397-1b56-4ba6-b409-4c427270cc1b",
      externalLink: "https://musicbrainz.org/work/59407397-1b56-4ba6-b409-4c427270cc1b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hello",
  artist: "artist/evynne-hollens",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
