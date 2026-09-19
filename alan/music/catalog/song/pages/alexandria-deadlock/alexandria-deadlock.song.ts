import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaDeadlock = {
  id: "01a0b726-8d99-701e-bbd8-147d1c29ac26",
  type: "page-type/song",
  slug: "alexandria-deadlock",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4cfbdc20-d3d6-4beb-b1f1-493288d03319",
      externalLink: "https://musicbrainz.org/recording/4cfbdc20-d3d6-4beb-b1f1-493288d03319",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Deadlock",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
