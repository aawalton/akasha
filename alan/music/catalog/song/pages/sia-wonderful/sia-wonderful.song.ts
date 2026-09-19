import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWonderful = {
  id: "019ea4ca-b5bd-75e4-8bb0-ed380440fd67",
  type: "page-type/song",
  slug: "sia-wonderful",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "12752c41-37df-47d9-bbcf-8b1ab9eca356",
      externalLink: "https://musicbrainz.org/work/12752c41-37df-47d9-bbcf-8b1ab9eca356",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wonderful",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
