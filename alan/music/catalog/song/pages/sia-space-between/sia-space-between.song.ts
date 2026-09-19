import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSpaceBetween = {
  id: "019ea4cb-a6df-72f9-99bf-150e98de0e4e",
  type: "page-type/song",
  slug: "sia-space-between",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "337b4984-5f07-45ee-a940-1974281ad8e0",
      externalLink: "https://musicbrainz.org/work/337b4984-5f07-45ee-a940-1974281ad8e0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Space Between",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
