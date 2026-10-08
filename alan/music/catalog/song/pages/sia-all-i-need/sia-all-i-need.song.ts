import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaAllINeed = {
  id: "019ea4c3-8945-7815-9e1f-fb101dccbfff",
  type: "page-type/song",
  slug: "sia-all-i-need",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4b034e47-7a44-3f17-a209-cc582bdf351b",
      externalLink: "https://musicbrainz.org/work/4b034e47-7a44-3f17-a209-cc582bdf351b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All I Need",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:05:38.629Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
