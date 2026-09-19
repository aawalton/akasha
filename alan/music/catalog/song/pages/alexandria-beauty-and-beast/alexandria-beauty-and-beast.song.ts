import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaBeautyAndBeast = {
  id: "01a0b726-8d51-7de8-a271-d2c1bcccbf18",
  type: "page-type/song",
  slug: "alexandria-beauty-and-beast",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5d1957bd-e906-49d6-81ad-726363d37daf",
      externalLink: "https://musicbrainz.org/recording/5d1957bd-e906-49d6-81ad-726363d37daf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Beauty and Beast",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
