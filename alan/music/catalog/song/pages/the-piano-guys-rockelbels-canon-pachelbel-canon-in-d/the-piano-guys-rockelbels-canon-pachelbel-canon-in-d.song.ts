import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysRockelbelsCanonPachelbelCanonInD = {
  id: "01a0b71e-97d3-7640-8f1d-43933ddc341a",
  type: "page-type/song",
  slug: "the-piano-guys-rockelbels-canon-pachelbel-canon-in-d",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "00b49475-1e48-4580-85f4-ab4beda6ace9",
      externalLink: "https://musicbrainz.org/work/00b49475-1e48-4580-85f4-ab4beda6ace9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rockelbel's Canon (Pachelbel Canon in D)",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
