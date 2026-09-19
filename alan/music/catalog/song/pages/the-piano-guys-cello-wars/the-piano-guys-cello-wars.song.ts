import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysCelloWars = {
  id: "01a0b71e-99dd-7b38-9fec-1cc930f849a2",
  type: "page-type/song",
  slug: "the-piano-guys-cello-wars",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3d5d0284-60d8-431d-a309-a201b1948a3a",
      externalLink: "https://musicbrainz.org/work/3d5d0284-60d8-431d-a309-a201b1948a3a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cello Wars",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
