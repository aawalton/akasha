import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaSpiritsOfThePast = {
  id: "01a0b726-9026-73df-b76d-c06daf4ef6dc",
  type: "page-type/song",
  slug: "alexandria-spirits-of-the-past",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "41fc3e56-4217-4a86-9948-629aae3583d2",
      externalLink: "https://musicbrainz.org/recording/41fc3e56-4217-4a86-9948-629aae3583d2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Spirits of the Past",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
