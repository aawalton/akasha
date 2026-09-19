import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWhatMakesYouBeautiful = {
  id: "01a0b71e-9a0d-79fa-8d14-1cf5774e8928",
  type: "page-type/song",
  slug: "the-piano-guys-what-makes-you-beautiful",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "48ca1011-73d3-454b-83fd-8d0685bde0cd",
      externalLink: "https://musicbrainz.org/work/48ca1011-73d3-454b-83fd-8d0685bde0cd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What Makes You Beautiful",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
