import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDevilInMe = {
  id: "019ea4c5-550d-7f78-a508-58bef0ede364",
  type: "page-type/song",
  slug: "sia-devil-in-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b2b00522-62c4-43ba-a815-3c443b5d8bce",
      externalLink: "https://musicbrainz.org/work/b2b00522-62c4-43ba-a815-3c443b5d8bce",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Devil in Me",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
