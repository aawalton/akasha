import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishGoodbye = {
  id: "019ea4a9-e814-7d50-b7b9-1c0aa026891a",
  type: "page-type/song",
  slug: "billie-eilish-goodbye",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6a17fb4b-2190-4d64-b369-fed846ab42d2",
      externalLink: "https://musicbrainz.org/work/6a17fb4b-2190-4d64-b369-fed846ab42d2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "goodbye",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
