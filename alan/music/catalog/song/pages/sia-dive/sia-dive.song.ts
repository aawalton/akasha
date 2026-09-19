import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDive = {
  id: "019ea4c3-4bd2-71eb-81ef-54f11806f91b",
  type: "page-type/song",
  slug: "sia-dive",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2b873f79-a769-474f-a3ad-f85a4ca26f83",
      externalLink: "https://musicbrainz.org/work/2b873f79-a769-474f-a3ad-f85a4ca26f83",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dive",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
