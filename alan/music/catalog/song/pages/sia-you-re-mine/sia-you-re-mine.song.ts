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
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
