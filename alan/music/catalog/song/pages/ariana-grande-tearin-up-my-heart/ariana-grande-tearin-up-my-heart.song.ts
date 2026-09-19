import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTearinUpMyHeart = {
  id: "019ea4e7-018e-7aa1-b5e2-95256daecad5",
  type: "page-type/song",
  slug: "ariana-grande-tearin-up-my-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a6eeb7f0-7df1-49ae-8121-e3b8c9647cf0",
      externalLink: "https://musicbrainz.org/work/a6eeb7f0-7df1-49ae-8121-e3b8c9647cf0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tearin’ Up My Heart",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
