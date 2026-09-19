import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaYouReMyFlame = {
  id: "019ea4ce-95fa-75ce-a8dc-0e2f7ca403eb",
  type: "page-type/song",
  slug: "sia-you-re-my-flame",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f51d7d32-fd1b-4296-8fa6-996d75bd0022",
      externalLink: "https://musicbrainz.org/work/f51d7d32-fd1b-4296-8fa6-996d75bd0022",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’re My Flame",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
