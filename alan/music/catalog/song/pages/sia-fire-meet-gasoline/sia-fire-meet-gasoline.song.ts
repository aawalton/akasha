import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaFireMeetGasoline = {
  id: "019ea4c6-bb5e-7385-bc6e-d6b3fa3c07fb",
  type: "page-type/song",
  slug: "sia-fire-meet-gasoline",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "095ba755-8be5-47c4-92d0-667a1595c0c0",
      externalLink: "https://musicbrainz.org/work/095ba755-8be5-47c4-92d0-667a1595c0c0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fire Meet Gasoline",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
