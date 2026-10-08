import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBreakTheWalls = {
  id: "019ea4c5-5e04-7334-9e52-52a664c8350d",
  type: "page-type/song",
  slug: "sia-break-the-walls",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b6cf3e03-e0e8-4d27-b5b7-909a6262a869",
      externalLink: "https://musicbrainz.org/work/b6cf3e03-e0e8-4d27-b5b7-909a6262a869",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Break the Walls",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:07:38.628Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
