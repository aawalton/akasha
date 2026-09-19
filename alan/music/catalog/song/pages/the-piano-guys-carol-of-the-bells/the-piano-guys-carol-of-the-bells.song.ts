import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysCarolOfTheBells = {
  id: "01a0b71e-98b0-7224-92fc-ae91d96cc3a9",
  type: "page-type/song",
  slug: "the-piano-guys-carol-of-the-bells",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "21a77a1e-5e17-38cf-bc77-9dc0c66e81b1",
      externalLink: "https://musicbrainz.org/work/21a77a1e-5e17-38cf-bc77-9dc0c66e81b1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Carol of the Bells",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
