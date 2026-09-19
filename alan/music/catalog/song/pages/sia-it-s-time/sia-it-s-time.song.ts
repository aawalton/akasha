import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaItSTime = {
  id: "019ea4c8-8cf7-723c-9f3c-6a018f1752bc",
  type: "page-type/song",
  slug: "sia-it-s-time",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "77d8836d-b8a8-4eb0-8a95-272392b2b552",
      externalLink: "https://musicbrainz.org/work/77d8836d-b8a8-4eb0-8a95-272392b2b552",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It’s Time",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
