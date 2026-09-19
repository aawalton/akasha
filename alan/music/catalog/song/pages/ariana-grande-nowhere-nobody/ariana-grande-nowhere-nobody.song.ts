import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeNowhereNobody = {
  id: "01a0b76f-ef57-7eac-9bf3-a2e52d369fe6",
  type: "page-type/song",
  slug: "ariana-grande-nowhere-nobody",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2d728495-9400-4604-a17b-d97a6b6063df",
      externalLink: "https://musicbrainz.org/work/2d728495-9400-4604-a17b-d97a6b6063df",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "nowhere, nobody",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
