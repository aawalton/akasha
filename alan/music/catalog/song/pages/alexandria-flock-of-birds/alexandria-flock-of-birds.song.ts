import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaFlockOfBirds = {
  id: "01a0b726-8e57-75de-9fcc-6fd5f533ba17",
  type: "page-type/song",
  slug: "alexandria-flock-of-birds",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7911d2e8-edd5-4ebc-b2ab-a749b8bf800c",
      externalLink: "https://musicbrainz.org/recording/7911d2e8-edd5-4ebc-b2ab-a749b8bf800c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Flock of Birds",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
