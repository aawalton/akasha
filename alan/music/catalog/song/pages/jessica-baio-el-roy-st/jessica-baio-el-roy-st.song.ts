import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioElRoySt = {
  id: "019ea4f7-5fe4-76ef-abcf-878c7e7eacab",
  type: "page-type/song",
  slug: "jessica-baio-el-roy-st",
  title: "el roy st.",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7d8e7cd1-b4f4-4a9b-ad22-516b49a70b83",
      externalLink: "https://musicbrainz.org/recording/7d8e7cd1-b4f4-4a9b-ad22-516b49a70b83",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T02:02:15.908Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
