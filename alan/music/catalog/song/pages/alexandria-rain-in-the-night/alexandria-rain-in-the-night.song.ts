import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaRainInTheNight = {
  id: "01a0b726-8fdc-70b8-b41c-c6a93f42415e",
  type: "page-type/song",
  slug: "alexandria-rain-in-the-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "760862e4-2552-49d3-a618-aad94d384993",
      externalLink: "https://musicbrainz.org/recording/760862e4-2552-49d3-a618-aad94d384993",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rain in the Night",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
