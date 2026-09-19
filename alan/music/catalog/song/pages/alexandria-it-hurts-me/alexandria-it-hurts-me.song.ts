import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaItHurtsMe = {
  id: "01a0b726-8f27-746a-8db0-db8efb9c63eb",
  type: "page-type/song",
  slug: "alexandria-it-hurts-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "98f5f2c6-e296-4b26-b1b6-2b976449e1fc",
      externalLink: "https://musicbrainz.org/recording/98f5f2c6-e296-4b26-b1b6-2b976449e1fc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It Hurts Me",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
