import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaEkg = {
  id: "019ea4c5-80c0-7d15-98ff-06ffce88a601",
  type: "page-type/song",
  slug: "sia-ekg",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ba279640-f7c6-426f-8a0c-19b111ff9c2d",
      externalLink: "https://musicbrainz.org/work/ba279640-f7c6-426f-8a0c-19b111ff9c2d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "EKG",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
