import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWaterfall = {
  id: "01a0b71e-9c4d-7595-91bb-6bad69ae1756",
  type: "page-type/song",
  slug: "the-piano-guys-waterfall",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9206d975-ba1c-49ef-9e2b-10d9e84c874e",
      externalLink: "https://musicbrainz.org/work/9206d975-ba1c-49ef-9e2b-10d9e84c874e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Waterfall",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
