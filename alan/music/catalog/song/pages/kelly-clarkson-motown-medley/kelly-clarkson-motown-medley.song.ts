import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonMotownMedley = {
  id: "01a0ba7f-beeb-7fa8-bf61-2b9a6e4757ac",
  type: "page-type/song",
  slug: "kelly-clarkson-motown-medley",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6b7d7e27-0392-4fa6-9e45-4cc17950e49a",
      externalLink: "https://musicbrainz.org/work/6b7d7e27-0392-4fa6-9e45-4cc17950e49a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Motown Medley",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
