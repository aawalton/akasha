import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysLordOfTheRings = {
  id: "01a0b71e-9b6f-7046-ab9e-e54be9bea46f",
  type: "page-type/song",
  slug: "the-piano-guys-lord-of-the-rings",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7ccfd6ae-e82d-4af0-9385-7fddb20d20c1",
      externalLink: "https://musicbrainz.org/work/7ccfd6ae-e82d-4af0-9385-7fddb20d20c1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lord of the Rings",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
