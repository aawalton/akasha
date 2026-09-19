import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysKungFuPianoCelloAscends = {
  id: "01a0b71e-9a9a-7bb4-afb2-401bbd752670",
  type: "page-type/song",
  slug: "the-piano-guys-kung-fu-piano-cello-ascends",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5bce5dd5-3304-4357-8d9d-4cdd6e505978",
      externalLink: "https://musicbrainz.org/work/5bce5dd5-3304-4357-8d9d-4cdd6e505978",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Kung Fu Piano: Cello Ascends",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
