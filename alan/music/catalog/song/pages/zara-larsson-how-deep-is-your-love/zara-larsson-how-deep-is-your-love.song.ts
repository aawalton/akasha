import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonHowDeepIsYourLove = {
  id: "019ea4a1-ec46-7f36-b30f-b30851b2a9e5",
  type: "page-type/song",
  slug: "zara-larsson-how-deep-is-your-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "eb30db46-4285-463e-ad55-a16457bcf2ee",
      externalLink: "https://musicbrainz.org/work/eb30db46-4285-463e-ad55-a16457bcf2ee",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "How Deep Is Your Love",
  artist: "artist/zara-larsson",
  performed: true,
} as const satisfies Song
