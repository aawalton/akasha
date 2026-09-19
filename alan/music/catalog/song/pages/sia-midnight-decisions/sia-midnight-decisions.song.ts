import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaMidnightDecisions = {
  id: "019ea4c8-d5fb-7439-a556-26f9b14c1fba",
  type: "page-type/song",
  slug: "sia-midnight-decisions",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8a387078-18da-4379-a562-270696e83e40",
      externalLink: "https://musicbrainz.org/work/8a387078-18da-4379-a562-270696e83e40",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Midnight Decisions",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
