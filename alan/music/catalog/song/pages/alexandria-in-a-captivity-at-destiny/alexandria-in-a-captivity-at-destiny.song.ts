import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaInACaptivityAtDestiny = {
  id: "01a0b726-8ef4-7f8b-9fba-7405dd892381",
  type: "page-type/song",
  slug: "alexandria-in-a-captivity-at-destiny",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "002212a4-2d73-42f9-a3d4-1ecb211c1a17",
      externalLink: "https://musicbrainz.org/recording/002212a4-2d73-42f9-a3d4-1ecb211c1a17",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In a Captivity at Destiny",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
