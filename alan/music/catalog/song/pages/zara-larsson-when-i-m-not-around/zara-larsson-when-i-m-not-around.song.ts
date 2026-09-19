import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonWhenIMNotAround = {
  id: "019ea49f-8817-7d33-9c3a-eca9f89edb30",
  type: "page-type/song",
  slug: "zara-larsson-when-i-m-not-around",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "57b6c411-6665-47a8-a087-2826238f4208",
      externalLink: "https://musicbrainz.org/work/57b6c411-6665-47a8-a087-2826238f4208",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "When I’m Not Around",
  artist: "artist/zara-larsson",
  performed: true,
} as const satisfies Song
