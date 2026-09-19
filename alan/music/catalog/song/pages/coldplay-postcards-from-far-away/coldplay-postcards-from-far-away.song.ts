import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayPostcardsFromFarAway = {
  id: "01a0ba60-f9fa-7ba6-a085-38877c3bfc4e",
  type: "page-type/song",
  slug: "coldplay-postcards-from-far-away",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c15c89c7-26fa-3902-80d5-515d5c1c759a",
      externalLink: "https://musicbrainz.org/work/c15c89c7-26fa-3902-80d5-515d5c1c759a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Postcards From Far Away",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
