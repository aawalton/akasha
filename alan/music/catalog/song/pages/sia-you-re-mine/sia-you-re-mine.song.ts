import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaYouReMine = {
  id: "019ea4cd-fcab-78a8-b90b-de7a2dd21875",
  type: "page-type/song",
  slug: "sia-you-re-mine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bbe99437-612a-463d-87ca-be5657652ed3",
      externalLink: "https://musicbrainz.org/work/bbe99437-612a-463d-87ca-be5657652ed3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’re Mine",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:17:03.531Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
