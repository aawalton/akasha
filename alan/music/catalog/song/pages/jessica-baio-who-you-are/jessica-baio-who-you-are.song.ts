import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioWhoYouAre = {
  id: "019ea4f9-1ff0-71d8-a723-f146c751e856",
  type: "page-type/song",
  slug: "jessica-baio-who-you-are",
  title: "who you are",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "17567374-5993-4e73-b246-fe6bfc1a5e3a",
      externalLink: "https://musicbrainz.org/recording/17567374-5993-4e73-b246-fe6bfc1a5e3a",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
