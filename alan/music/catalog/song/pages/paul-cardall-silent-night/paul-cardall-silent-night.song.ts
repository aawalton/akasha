import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSilentNight = {
  id: "01a0b71d-3b92-7d2d-8424-d19a9eb33e24",
  type: "page-type/song",
  slug: "paul-cardall-silent-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "590e5567-c188-31f0-b7a8-a94e7e51c7b3",
      externalLink: "https://musicbrainz.org/work/590e5567-c188-31f0-b7a8-a94e7e51c7b3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Silent Night",
  artist: "artist/paul-cardall",
  songType: "derivative",
  performed: true,
} as const satisfies Song
