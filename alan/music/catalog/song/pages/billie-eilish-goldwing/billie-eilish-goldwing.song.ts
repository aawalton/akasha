import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishGoldwing = {
  id: "019ea4a9-4afd-769c-b924-137eb4c66f04",
  type: "page-type/song",
  slug: "billie-eilish-goldwing",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4a145f8d-bf24-4497-a41d-e7947346b5a4",
      externalLink: "https://musicbrainz.org/work/4a145f8d-bf24-4497-a41d-e7947346b5a4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "GOLDWING",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
