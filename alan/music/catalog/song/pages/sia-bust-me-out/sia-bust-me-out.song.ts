import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBustMeOut = {
  id: "019ea4c5-4572-7c99-aeb9-0ee7f64c2479",
  type: "page-type/song",
  slug: "sia-bust-me-out",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "afe64e0a-03fe-4df0-b83b-eda053050d9d",
      externalLink: "https://musicbrainz.org/work/afe64e0a-03fe-4df0-b83b-eda053050d9d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bust Me Out",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
