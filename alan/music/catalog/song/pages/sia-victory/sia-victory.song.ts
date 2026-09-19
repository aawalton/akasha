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
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
