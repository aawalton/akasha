import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaFlashlight = {
  id: "019ea4c8-17d2-7137-8f91-c668bb38334f",
  type: "page-type/song",
  slug: "sia-flashlight",
  title: "Flashlight",
  artist: "artist/sia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6131bd2d-aca6-44fc-bd63-3e73a6ecfcdd",
      externalLink: "https://musicbrainz.org/work/6131bd2d-aca6-44fc-bd63-3e73a6ecfcdd",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
