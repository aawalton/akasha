import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaGetMe = {
  id: "019ea4c6-da16-7e3d-8f3f-befd1ffb0993",
  type: "page-type/song",
  slug: "sia-get-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0e9f4c8e-6054-45c3-8cd4-2928f2ce799d",
      externalLink: "https://musicbrainz.org/work/0e9f4c8e-6054-45c3-8cd4-2928f2ce799d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Get Me",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
