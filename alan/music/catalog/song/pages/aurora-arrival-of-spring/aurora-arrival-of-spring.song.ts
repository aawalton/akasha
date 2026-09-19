import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraArrivalOfSpring = {
  id: "019ea4a4-262f-7e90-86b4-9439ca65d029",
  type: "page-type/song",
  slug: "aurora-arrival-of-spring",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "35295b77-b090-4709-b205-3813495548c5",
      externalLink: "https://musicbrainz.org/work/35295b77-b090-4709-b205-3813495548c5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Arrival of Spring",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
