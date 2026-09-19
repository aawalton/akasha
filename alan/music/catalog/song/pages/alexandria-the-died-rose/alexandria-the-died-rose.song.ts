import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaTheDiedRose = {
  id: "01a0b726-907d-7e8e-8957-97358148fba4",
  type: "page-type/song",
  slug: "alexandria-the-died-rose",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a8b827a9-ff25-42fe-acbb-34bb315e2f86",
      externalLink: "https://musicbrainz.org/recording/a8b827a9-ff25-42fe-acbb-34bb315e2f86",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Died Rose",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
