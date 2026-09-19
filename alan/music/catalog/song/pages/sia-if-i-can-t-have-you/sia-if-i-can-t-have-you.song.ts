import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaIfICanTHaveYou = {
  id: "019ea4c8-6882-78ef-aea0-89ce9f77ff58",
  type: "page-type/song",
  slug: "sia-if-i-can-t-have-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "73724f79-a686-4bea-ac69-5e6028b18d97",
      externalLink: "https://musicbrainz.org/work/73724f79-a686-4bea-ac69-5e6028b18d97",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "If I Can’t Have You",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
