import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysBeginAgain = {
  id: "01a0b71e-9ddd-7ae6-a401-5656d7c47e80",
  type: "page-type/song",
  slug: "the-piano-guys-begin-again",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d1824200-db72-4350-bbe5-489aaf80464e",
      externalLink: "https://musicbrainz.org/work/d1824200-db72-4350-bbe5-489aaf80464e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Begin Again",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
