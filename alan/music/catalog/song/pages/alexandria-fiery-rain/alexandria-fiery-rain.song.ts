import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaFieryRain = {
  id: "01a0b726-8e02-7a1e-9ff3-37a96a844617",
  type: "page-type/song",
  slug: "alexandria-fiery-rain",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dd649278-0579-451c-8c19-d6e0979fadcd",
      externalLink: "https://musicbrainz.org/recording/dd649278-0579-451c-8c19-d6e0979fadcd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fiery Rain",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
