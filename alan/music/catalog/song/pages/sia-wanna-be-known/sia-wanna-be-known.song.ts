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
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:14:10.845Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
