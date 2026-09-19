import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysShapeOfMyHeart = {
  id: "01a0b71e-9897-74ab-9add-2bd33f12e096",
  type: "page-type/song",
  slug: "the-piano-guys-shape-of-my-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "20926c71-170c-30a7-85a7-e3c4ec5e9cac",
      externalLink: "https://musicbrainz.org/work/20926c71-170c-30a7-85a7-e3c4ec5e9cac",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shape of My Heart",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
