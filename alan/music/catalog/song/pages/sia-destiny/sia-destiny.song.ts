import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDestiny = {
  id: "019ea4c5-8f56-759d-95c4-d11d9df85979",
  type: "page-type/song",
  slug: "sia-destiny",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bca7440c-8c45-4c7d-9e44-b7d0e82ddbdc",
      externalLink: "https://musicbrainz.org/work/bca7440c-8c45-4c7d-9e44-b7d0e82ddbdc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Destiny",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
