import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayLiveForever = {
  id: "01a0ba5d-4c1d-7def-a348-ab2b50706281",
  type: "page-type/song",
  slug: "coldplay-live-forever",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0d1edfcf-8582-321f-a91d-869f5afcec3e",
      externalLink: "https://musicbrainz.org/work/0d1edfcf-8582-321f-a91d-869f5afcec3e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Live Forever",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
