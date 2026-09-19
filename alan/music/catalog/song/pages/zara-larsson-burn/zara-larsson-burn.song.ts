import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonBurn = {
  id: "019ea49f-acd2-757e-bcfe-a68ac48b1a0b",
  type: "page-type/song",
  slug: "zara-larsson-burn",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5b90ea12-44d0-47f6-9373-0a63c4ad1e57",
      externalLink: "https://musicbrainz.org/work/5b90ea12-44d0-47f6-9373-0a63c4ad1e57",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Burn",
  artist: "artist/zara-larsson",
  performed: true,
} as const satisfies Song
