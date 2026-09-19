import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonReady = {
  id: "019ea4c1-85fc-7dc0-8f65-9d8b00fcebe3",
  type: "page-type/song",
  slug: "kelly-clarkson-ready",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e457c8d8-f485-39c6-bc15-120624342320",
      externalLink: "https://musicbrainz.org/work/e457c8d8-f485-39c6-bc15-120624342320",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ready",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
