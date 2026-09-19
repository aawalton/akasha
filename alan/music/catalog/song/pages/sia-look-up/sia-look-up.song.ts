import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLookUp = {
  id: "019ea4ca-28c3-7a93-a734-30a02090c0dc",
  type: "page-type/song",
  slug: "sia-look-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "eb4a8fad-9745-4f5f-a75a-c20281545edd",
      externalLink: "https://musicbrainz.org/work/eb4a8fad-9745-4f5f-a75a-c20281545edd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Look Up",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
