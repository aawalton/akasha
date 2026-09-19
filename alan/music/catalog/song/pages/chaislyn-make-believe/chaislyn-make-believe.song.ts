import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const chaislynMakeBelieve = {
  id: "019ea4f5-255a-70bd-86b9-c2c328ee002c",
  type: "page-type/song",
  slug: "chaislyn-make-believe",
  title: "Make Believe",
  artist: "artist/chaislyn",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a131e3b2-d51d-4fb2-9e7d-7bac51da679e",
      externalLink: "https://musicbrainz.org/recording/a131e3b2-d51d-4fb2-9e7d-7bac51da679e",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
