import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBoyProblems = {
  id: "019ea4c3-6ccc-7f14-9271-df5b5153a6d8",
  type: "page-type/song",
  slug: "sia-boy-problems",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "45943155-7694-4762-bfbf-28a7327a20ce",
      externalLink: "https://musicbrainz.org/work/45943155-7694-4762-bfbf-28a7327a20ce",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Boy Problems",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:05:31.340Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
