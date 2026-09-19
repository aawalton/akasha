import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayEverythingsNotLost = {
  id: "01a0ba5d-391b-758a-a212-04200d7ab074",
  type: "page-type/song",
  slug: "coldplay-everythings-not-lost",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "13d0d184-daae-3c1c-becc-c8f73dfa5df5",
      externalLink: "https://musicbrainz.org/work/13d0d184-daae-3c1c-becc-c8f73dfa5df5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everything’s Not Lost",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
