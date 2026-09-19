import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSciogliLamore = {
  id: "01a0b72f-4770-7c37-92de-7d07262ab449",
  type: "page-type/song",
  slug: "james-taylor-sciogli-lamore",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1f00b0d7-279d-45f3-9cfe-b2b14801336e",
      externalLink: "https://musicbrainz.org/work/1f00b0d7-279d-45f3-9cfe-b2b14801336e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sciogli l’amore",
  artist: "artist/james-taylor",
  performed: false,
  written: "collab",
} as const satisfies Song
