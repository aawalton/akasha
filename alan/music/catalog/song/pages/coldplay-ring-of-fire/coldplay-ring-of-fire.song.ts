import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayRingOfFire = {
  id: "01a0ba60-f7f7-76fc-8b5a-6a7ca081a539",
  type: "page-type/song",
  slug: "coldplay-ring-of-fire",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b00cccfb-75f1-371b-9181-8d3ed0723114",
      externalLink: "https://musicbrainz.org/work/b00cccfb-75f1-371b-9181-8d3ed0723114",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ring of Fire",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
