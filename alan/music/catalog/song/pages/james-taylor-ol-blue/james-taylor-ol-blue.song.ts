import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOlBlue = {
  id: "01a0b72f-34e1-79ab-8c2e-864c14c2eae4",
  type: "page-type/song",
  slug: "james-taylor-ol-blue",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2b2e1fae-39dc-423b-b38d-708aa16f2e86",
      externalLink: "https://musicbrainz.org/work/2b2e1fae-39dc-423b-b38d-708aa16f2e86",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ol’ Blue",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
} as const satisfies Song
