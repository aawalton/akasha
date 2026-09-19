import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaHymnToMyEnemies = {
  id: "01a0b726-8eb5-7c58-8bf3-6d75b2d5e488",
  type: "page-type/song",
  slug: "alexandria-hymn-to-my-enemies",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "274dbd06-a941-45e3-a698-426837a192ba",
      externalLink: "https://musicbrainz.org/recording/274dbd06-a941-45e3-a698-426837a192ba",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hymn to My Enemies",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
