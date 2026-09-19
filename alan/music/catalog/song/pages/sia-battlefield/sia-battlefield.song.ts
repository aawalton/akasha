import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBattlefield = {
  id: "019ea4c4-40a8-7e90-80d9-1739ff3a079e",
  type: "page-type/song",
  slug: "sia-battlefield",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "77f57894-abd3-4fbe-b801-e33f885d9435",
      externalLink: "https://musicbrainz.org/work/77f57894-abd3-4fbe-b801-e33f885d9435",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Battlefield",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
