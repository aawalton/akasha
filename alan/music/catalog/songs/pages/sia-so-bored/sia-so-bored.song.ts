import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const siaSoBored = {
  id: "019ea4cc-b7ae-7e9d-bd43-ed8b31266b0b",
  type: "song",
  slug: "sia-so-bored",
  title: "So Bored",
  artist: "artist/sia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "76840f00-b43b-4ac5-b582-6dad8cb1b272",
      externalLink: "https://musicbrainz.org/work/76840f00-b43b-4ac5-b582-6dad8cb1b272",
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
