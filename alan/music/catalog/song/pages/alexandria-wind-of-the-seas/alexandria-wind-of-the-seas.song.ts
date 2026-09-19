import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaWindOfTheSeas = {
  id: "01a0b726-9114-7365-809c-c6cd799d2ed1",
  type: "page-type/song",
  slug: "alexandria-wind-of-the-seas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f56d1d18-6b67-412f-b31a-6d7012888e4e",
      externalLink: "https://musicbrainz.org/recording/f56d1d18-6b67-412f-b31a-6d7012888e4e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wind of the Seas",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
