import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTheTimesTheyAreAChangin = {
  id: "01a0b72f-4cb7-7489-8bfe-89ff91f6dc1a",
  type: "page-type/song",
  slug: "james-taylor-the-times-they-are-a-changin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "59f4520e-95e1-3f77-ab62-ff9f21285bec",
      externalLink: "https://musicbrainz.org/work/59f4520e-95e1-3f77-ab62-ff9f21285bec",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Times They Are A‐Changin’",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
} as const satisfies Song
