import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHungryHeart = {
  id: "01a0ba5d-4827-7241-9d10-c0e17793b2d9",
  type: "page-type/song",
  slug: "coldplay-hungry-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "db8f3060-b101-3877-9805-ce054f923302",
      externalLink: "https://musicbrainz.org/work/db8f3060-b101-3877-9805-ce054f923302",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hungry Heart",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
