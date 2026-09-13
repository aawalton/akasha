import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const taylorSwiftWeWereHappy = {
  id: "019ea416-475d-7259-99e7-9dab7f73769d",
  type: "song",
  slug: "taylor-swift-we-were-happy",
  title: "We Were Happy",
  artist: "taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "899e2daf-b467-4196-b645-c0ffcc157edb",
      externalLink: "https://musicbrainz.org/work/899e2daf-b467-4196-b645-c0ffcc157edb",
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
