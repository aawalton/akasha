import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWannaBeKnown = {
  id: "019ea4cb-5a1d-73a9-99ee-c6c3e68f8066",
  type: "page-type/song",
  slug: "sia-wanna-be-known",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "272780a0-72e0-4ba5-a5cd-6df68477e1af",
      externalLink: "https://musicbrainz.org/work/272780a0-72e0-4ba5-a5cd-6df68477e1af",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wanna Be Known",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
