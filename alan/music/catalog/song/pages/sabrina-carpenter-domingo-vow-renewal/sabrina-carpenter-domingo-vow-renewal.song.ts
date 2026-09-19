import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterDomingoVowRenewal = {
  id: "01a0b723-cbba-7879-94b2-b0475a8450f1",
  type: "page-type/song",
  slug: "sabrina-carpenter-domingo-vow-renewal",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "af78111d-c5b5-4294-917c-9e1b58629267",
      externalLink: "https://musicbrainz.org/work/af78111d-c5b5-4294-917c-9e1b58629267",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Domingo: Vow Renewal",
  artist: "artist/sabrina-carpenter",
  performed: true,
} as const satisfies Song
