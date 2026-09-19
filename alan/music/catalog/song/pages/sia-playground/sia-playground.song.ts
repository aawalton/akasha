import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaPlayground = {
  id: "019ea4cc-ff65-72e6-8dfa-e2aafb375257",
  type: "page-type/song",
  slug: "sia-playground",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "83dd9d8a-240d-4380-b47f-1d6a167533de",
      externalLink: "https://musicbrainz.org/work/83dd9d8a-240d-4380-b47f-1d6a167533de",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Playground",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
