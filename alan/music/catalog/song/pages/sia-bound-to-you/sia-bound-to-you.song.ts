import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBoundToYou = {
  id: "019ea4c3-a508-7765-a256-27a5e97c3ae3",
  type: "page-type/song",
  slug: "sia-bound-to-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4de1cdd7-7b24-4862-800d-c352b1fe3091",
      externalLink: "https://musicbrainz.org/work/4de1cdd7-7b24-4862-800d-c352b1fe3091",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bound to You",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:05:45.736Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
