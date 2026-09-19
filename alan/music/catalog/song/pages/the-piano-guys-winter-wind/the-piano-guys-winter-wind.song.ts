import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWinterWind = {
  id: "01a0b71e-9eba-75ff-ab03-bfa6ae8bd826",
  type: "page-type/song",
  slug: "the-piano-guys-winter-wind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e1d28432-2046-4c22-b9b5-e5e611919d18",
      externalLink: "https://musicbrainz.org/work/e1d28432-2046-4c22-b9b5-e5e611919d18",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Winter Wind",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
