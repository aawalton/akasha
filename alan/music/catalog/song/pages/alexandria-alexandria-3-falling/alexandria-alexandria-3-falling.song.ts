import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaAlexandria3Falling = {
  id: "01a0b726-8d08-711c-b6cf-66bb2c6ff5f1",
  type: "page-type/song",
  slug: "alexandria-alexandria-3-falling",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b492b56f-2587-4133-b643-b05936429033",
      externalLink: "https://musicbrainz.org/recording/b492b56f-2587-4133-b643-b05936429033",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Alexandria 3 (Falling)",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
