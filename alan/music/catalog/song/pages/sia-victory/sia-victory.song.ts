import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaVictory = {
  id: "019ea4ce-2f47-7416-a6a8-34cb934fbd6d",
  type: "page-type/song",
  slug: "sia-victory",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cbb1827d-d3c3-4587-918c-bc909dbb561c",
      externalLink: "https://musicbrainz.org/work/cbb1827d-d3c3-4587-918c-bc909dbb561c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Victory",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:17:16.487Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
