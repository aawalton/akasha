import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaFlightsInADream = {
  id: "01a0b726-8e3b-79a4-9985-a3961312e703",
  type: "page-type/song",
  slug: "alexandria-flights-in-a-dream",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f41d451e-23a5-4575-bfe9-2eef6108b4a4",
      externalLink: "https://musicbrainz.org/recording/f41d451e-23a5-4575-bfe9-2eef6108b4a4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Flights in a Dream",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
