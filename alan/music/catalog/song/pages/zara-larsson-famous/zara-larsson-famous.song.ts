import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonFamous = {
  id: "019ea4a2-311a-787e-9063-11dc892a3f22",
  type: "page-type/song",
  slug: "zara-larsson-famous",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fa476a6b-e7c0-4ab1-a4f8-afd7fd0b6130",
      externalLink: "https://musicbrainz.org/work/fa476a6b-e7c0-4ab1-a4f8-afd7fd0b6130",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Famous",
  artist: "artist/zara-larsson",
  performed: true,
} as const satisfies Song
