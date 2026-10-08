import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTheGame = {
  id: "019ea4cb-dfec-703e-abdd-079ef3094cfc",
  type: "page-type/song",
  slug: "sia-the-game",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3d38c09d-3c7c-435a-a5bb-35c027145c23",
      externalLink: "https://musicbrainz.org/work/3d38c09d-3c7c-435a-a5bb-35c027145c23",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Game",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:14:45.100Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
