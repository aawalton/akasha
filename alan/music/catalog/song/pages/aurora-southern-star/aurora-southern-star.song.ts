import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraSouthernStar = {
  id: "019ea4a5-c9c3-774c-8738-3bafc73a7ba7",
  type: "page-type/song",
  slug: "aurora-southern-star",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "71ce3ee9-d4dc-4b9a-acd7-2901bd771c24",
      externalLink: "https://musicbrainz.org/work/71ce3ee9-d4dc-4b9a-acd7-2901bd771c24",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Southern Star",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
