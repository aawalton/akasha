import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysMoreThanWords = {
  id: "01a0b71e-9ab1-7eef-89c2-880e17ca66a4",
  type: "page-type/song",
  slug: "the-piano-guys-more-than-words",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6034dfa4-286e-3e92-b92c-877a7f4753ae",
      externalLink: "https://musicbrainz.org/work/6034dfa4-286e-3e92-b92c-877a7f4753ae",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "More Than Words",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
