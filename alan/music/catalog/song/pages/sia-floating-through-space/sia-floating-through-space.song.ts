import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaFloatingThroughSpace = {
  id: "019ea4c7-81f5-77fe-9baf-7197c661f681",
  type: "page-type/song",
  slug: "sia-floating-through-space",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3f5c1f57-75ee-4a55-b2da-65ca64e5b400",
      externalLink: "https://musicbrainz.org/work/3f5c1f57-75ee-4a55-b2da-65ca64e5b400",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Floating Through Space",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
