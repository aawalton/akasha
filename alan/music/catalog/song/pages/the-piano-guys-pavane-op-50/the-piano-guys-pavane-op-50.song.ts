import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysPavaneOp50 = {
  id: "01a0b71e-9fc4-7f92-84c4-2d8f045780ad",
  type: "page-type/song",
  slug: "the-piano-guys-pavane-op-50",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fea62425-85b7-4070-8a5e-9b9658e2ade0",
      externalLink: "https://musicbrainz.org/work/fea62425-85b7-4070-8a5e-9b9658e2ade0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pavane, op. 50",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
