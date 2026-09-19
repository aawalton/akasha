import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSecret = {
  id: "019ea4a0-2966-7514-80bb-c2399a51c156",
  type: "page-type/song",
  slug: "zara-larsson-secret",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7c4ce678-88e6-4813-bcb3-1ec5bb4c99f6",
      externalLink: "https://musicbrainz.org/work/7c4ce678-88e6-4813-bcb3-1ec5bb4c99f6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Secret",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
