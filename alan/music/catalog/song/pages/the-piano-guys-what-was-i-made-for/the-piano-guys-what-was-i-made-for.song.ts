import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWhatWasIMadeFor = {
  id: "01a0b71e-99c6-7c9e-8bd3-050bed327c40",
  type: "page-type/song",
  slug: "the-piano-guys-what-was-i-made-for",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3a301a39-2be9-420b-ae82-ec7869c77ce8",
      externalLink: "https://musicbrainz.org/work/3a301a39-2be9-420b-ae82-ec7869c77ce8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What Was I Made For?",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
