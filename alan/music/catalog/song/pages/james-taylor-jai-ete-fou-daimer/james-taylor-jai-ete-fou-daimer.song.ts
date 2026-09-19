import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorJaiEteFouDaimer = {
  id: "01a0b72f-3c85-7583-a83b-cd6912121340",
  type: "page-type/song",
  slug: "james-taylor-jai-ete-fou-daimer",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9ccb18f4-f0ca-466d-86f9-de7769f797d8",
      externalLink: "https://musicbrainz.org/work/9ccb18f4-f0ca-466d-86f9-de7769f797d8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "J’ai été fou d’aimer",
  artist: "artist/james-taylor",
  performed: false,
  written: "collab",
} as const satisfies Song
