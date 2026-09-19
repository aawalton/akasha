import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaKissMeOnce = {
  id: "019ea4ca-67b8-7cd0-a015-739f6a253e0a",
  type: "page-type/song",
  slug: "sia-kiss-me-once",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fba09554-f656-4706-a0b4-441622a819c1",
      externalLink: "https://musicbrainz.org/work/fba09554-f656-4706-a0b4-441622a819c1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Kiss Me Once",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
