import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const taylorSwiftHoax = {
  id: "019ea416-2319-75d5-a1d4-7f75d1364887",
  type: "song",
  slug: "taylor-swift-hoax",
  title: "hoax",
  artist: "taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "899bb16d-7894-4234-bb4b-b21982bee084",
      externalLink: "https://musicbrainz.org/work/899bb16d-7894-4234-bb4b-b21982bee084",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
