import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeLoveLanguage = {
  id: "019ea4e3-3b4c-7aea-83f1-de39c3dce1ff",
  type: "page-type/song",
  slug: "ariana-grande-love-language",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d0d5383e-a7c5-4d4d-ae2a-9cc83dd10901",
      externalLink: "https://musicbrainz.org/work/d0d5383e-a7c5-4d4d-ae2a-9cc83dd10901",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love Language",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:40:15.820Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
