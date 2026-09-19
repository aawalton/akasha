import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBlindedByLove = {
  id: "019ea4c4-1b88-77a5-9f8e-c65eb8bda1a5",
  type: "page-type/song",
  slug: "sia-blinded-by-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6e361791-34d3-4fcf-a402-896ca600b880",
      externalLink: "https://musicbrainz.org/work/6e361791-34d3-4fcf-a402-896ca600b880",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blinded by Love",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
