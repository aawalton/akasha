import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishThereforeIAm = {
  id: "019ea4a8-e5c3-7983-8a74-1e1a4529a345",
  type: "page-type/song",
  slug: "billie-eilish-therefore-i-am",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "35117fd6-7860-48d5-8d33-4731b13c3816",
      externalLink: "https://musicbrainz.org/work/35117fd6-7860-48d5-8d33-4731b13c3816",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Therefore I Am",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
