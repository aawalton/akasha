import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaNowhereToBe = {
  id: "019ea4c9-9fdd-78c4-8923-303601cafe52",
  type: "page-type/song",
  slug: "sia-nowhere-to-be",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b614601d-16e6-4a36-ad74-5f074da0b8af",
      externalLink: "https://musicbrainz.org/work/b614601d-16e6-4a36-ad74-5f074da0b8af",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nowhere to Be",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
