import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSolsburyHill = {
  id: "019ea4ca-ccef-700f-b7bf-ee9320a7888e",
  type: "page-type/song",
  slug: "sia-solsbury-hill",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "17921999-272a-389b-a2f3-0e9f98924767",
      externalLink: "https://musicbrainz.org/work/17921999-272a-389b-a2f3-0e9f98924767",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Solsbury Hill",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
