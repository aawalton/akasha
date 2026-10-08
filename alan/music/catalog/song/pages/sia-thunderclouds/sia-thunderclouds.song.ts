import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaThunderclouds = {
  id: "019ea4cd-beb5-799a-a324-b5640eeabd79",
  type: "page-type/song",
  slug: "sia-thunderclouds",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b3111c24-2758-4f41-ba39-65a8e32c25a1",
      externalLink: "https://musicbrainz.org/work/b3111c24-2758-4f41-ba39-65a8e32c25a1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Thunderclouds",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:16:47.669Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
