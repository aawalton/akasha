import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeRainOnMe = {
  id: "019ea4e4-1a7e-7a72-8b53-c965e3e78f0b",
  type: "page-type/song",
  slug: "ariana-grande-rain-on-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0d7a6bf0-9a91-46d4-b1df-10e84601a1dd",
      externalLink: "https://musicbrainz.org/work/0d7a6bf0-9a91-46d4-b1df-10e84601a1dd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rain on Me",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
