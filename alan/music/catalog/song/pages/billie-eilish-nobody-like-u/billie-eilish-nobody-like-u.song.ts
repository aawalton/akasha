import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishNobodyLikeU = {
  id: "019ea4ab-378a-7ca1-8cb0-d0218408a4ba",
  type: "page-type/song",
  slug: "billie-eilish-nobody-like-u",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c324a482-90df-4400-8249-a6ef24ca56ef",
      externalLink: "https://musicbrainz.org/work/c324a482-90df-4400-8249-a6ef24ca56ef",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nobody Like U",
  artist: "artist/billie-eilish",
  songType: "derivative",
  performed: false,
  written: "collab",
} as const satisfies Song
