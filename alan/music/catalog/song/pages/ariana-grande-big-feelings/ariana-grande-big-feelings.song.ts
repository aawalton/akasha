import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBigFeelings = {
  id: "01a0b76f-e8ec-73b3-94c6-4bd66819212f",
  type: "page-type/song",
  slug: "ariana-grande-big-feelings",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e92f9091-f73d-4c62-bc75-0ee055c18905",
      externalLink: "https://musicbrainz.org/work/e92f9091-f73d-4c62-bc75-0ee055c18905",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "big feelings",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
