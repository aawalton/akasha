import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaElasticHeart = {
  id: "019ea4c3-0e1d-78a3-895f-0bd31605d79e",
  type: "page-type/song",
  slug: "sia-elastic-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "19d264df-da69-4a70-8778-2f55ff5a9f4c",
      externalLink: "https://musicbrainz.org/work/19d264df-da69-4a70-8778-2f55ff5a9f4c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Elastic Heart",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
