import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaTheStrangeGirl = {
  id: "01a0b726-90d3-72fb-8996-3fd8efc44e02",
  type: "page-type/song",
  slug: "alexandria-the-strange-girl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dea06a58-f9e2-4f41-b909-7bf702900d05",
      externalLink: "https://musicbrainz.org/recording/dea06a58-f9e2-4f41-b909-7bf702900d05",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Strange Girl",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
