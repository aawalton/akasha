import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioMetaphor = {
  id: "019ea4f8-34e6-7447-893e-3f4f5c0a9dfd",
  type: "page-type/song",
  slug: "jessica-baio-metaphor",
  title: "metaphor",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a7b5ce87-3ea8-4aae-85e7-4b1e2b49d82c",
      externalLink: "https://musicbrainz.org/recording/a7b5ce87-3ea8-4aae-85e7-4b1e2b49d82c",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
