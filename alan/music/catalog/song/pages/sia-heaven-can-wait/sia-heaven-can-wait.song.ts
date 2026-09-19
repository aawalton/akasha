import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHeavenCanWait = {
  id: "019ea4ca-3760-7564-9cef-106dcbbcdf0b",
  type: "page-type/song",
  slug: "sia-heaven-can-wait",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f0af317d-937f-4619-b647-a135c6748c98",
      externalLink: "https://musicbrainz.org/work/f0af317d-937f-4619-b647-a135c6748c98",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Heaven Can Wait",
  artist: "artist/sia",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
