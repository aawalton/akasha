import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxIceAge = {
  id: "019ea4f6-0344-7634-b340-d05b2231ae6f",
  type: "page-type/song",
  slug: "lilith-max-ice-age",
  title: "Ice Age",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d8597c2c-147a-481d-83af-df75fb70b8bc",
      externalLink: "https://musicbrainz.org/recording/d8597c2c-147a-481d-83af-df75fb70b8bc",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T02:00:46.660Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
