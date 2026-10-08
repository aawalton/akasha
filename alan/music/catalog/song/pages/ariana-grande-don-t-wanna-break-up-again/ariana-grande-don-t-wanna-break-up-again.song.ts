import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeDonTWannaBreakUpAgain = {
  id: "019ea4e1-31b7-7412-9287-065461f1836b",
  type: "page-type/song",
  slug: "ariana-grande-don-t-wanna-break-up-again",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "41a65254-7b42-4ae2-8f6d-810a10ae750c",
      externalLink: "https://musicbrainz.org/work/41a65254-7b42-4ae2-8f6d-810a10ae750c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "don’t wanna break up again",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:38:02.295Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
