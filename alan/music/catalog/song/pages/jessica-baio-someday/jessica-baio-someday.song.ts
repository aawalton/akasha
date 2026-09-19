import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioSomeday = {
  id: "019ea4f8-e4fc-7889-b6b3-0c9ece87709c",
  type: "page-type/song",
  slug: "jessica-baio-someday",
  title: "someday",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5d416078-fd4f-4bef-acb8-bb7899251773",
      externalLink: "https://musicbrainz.org/recording/5d416078-fd4f-4bef-acb8-bb7899251773",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
