import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysGoodKingWenceslas = {
  id: "01a0b71e-9cc4-77c6-b108-772b2b261bc1",
  type: "page-type/song",
  slug: "the-piano-guys-good-king-wenceslas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a557f97b-6221-3ee8-9f86-bcb26bf43ab3",
      externalLink: "https://musicbrainz.org/work/a557f97b-6221-3ee8-9f86-bcb26bf43ab3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Good King Wenceslas",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
