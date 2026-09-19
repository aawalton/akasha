import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaMusic = {
  id: "019ea4c7-7a2a-7c43-8495-4b6900dbcc78",
  type: "page-type/song",
  slug: "sia-music",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ebb530e-9ed0-4c95-bff8-626afa76477d",
      externalLink: "https://musicbrainz.org/work/3ebb530e-9ed0-4c95-bff8-626afa76477d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Music",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
