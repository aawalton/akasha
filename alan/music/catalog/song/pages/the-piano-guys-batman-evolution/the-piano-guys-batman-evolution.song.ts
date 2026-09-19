import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysBatmanEvolution = {
  id: "01a0b71e-9f82-794b-8f6c-0a42979c0fe6",
  type: "page-type/song",
  slug: "the-piano-guys-batman-evolution",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f1d7d28e-a694-4ea9-bf3e-defbba2a8f44",
      externalLink: "https://musicbrainz.org/work/f1d7d28e-a694-4ea9-bf3e-defbba2a8f44",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Batman Evolution",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
