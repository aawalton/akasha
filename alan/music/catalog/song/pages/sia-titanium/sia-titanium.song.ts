import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTitanium = {
  id: "019ea4cb-7676-70dd-b865-fe24bb1aea0c",
  type: "page-type/song",
  slug: "sia-titanium",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "29fd6a5f-8c0e-4512-9d1f-c065bf614104",
      externalLink: "https://musicbrainz.org/work/29fd6a5f-8c0e-4512-9d1f-c065bf614104",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Titanium",
  artist: "artist/sia",
  songType: "derivative",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
