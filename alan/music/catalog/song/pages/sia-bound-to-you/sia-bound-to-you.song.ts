import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBoundToYou = {
  id: "019ea4c3-a508-7765-a256-27a5e97c3ae3",
  type: "page-type/song",
  slug: "sia-bound-to-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4de1cdd7-7b24-4862-800d-c352b1fe3091",
      externalLink: "https://musicbrainz.org/work/4de1cdd7-7b24-4862-800d-c352b1fe3091",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bound to You",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
