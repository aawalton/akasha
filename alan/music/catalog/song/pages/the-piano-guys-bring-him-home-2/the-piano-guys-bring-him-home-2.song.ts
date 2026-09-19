import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysBringHimHome2 = {
  id: "01a0b71e-9c6a-7c29-8a8e-c9102f0925dd",
  type: "page-type/song",
  slug: "the-piano-guys-bring-him-home-2",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "96adcae2-abe6-475d-bf75-c83d0d71139a",
      externalLink: "https://musicbrainz.org/work/96adcae2-abe6-475d-bf75-c83d0d71139a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bring Him Home",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
