import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioEasy = {
  id: "019ea4f7-57a5-7591-9412-deda750da23f",
  type: "page-type/song",
  slug: "jessica-baio-easy",
  title: "easy",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "af8ec822-55ba-4c1d-9167-521aa7f4f9be",
      externalLink: "https://musicbrainz.org/recording/af8ec822-55ba-4c1d-9167-521aa7f4f9be",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T02:02:13.797Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
