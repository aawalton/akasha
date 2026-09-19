import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBreathin = {
  id: "019ea4e1-1a8a-7a17-b844-34e41aa5d5b3",
  type: "page-type/song",
  slug: "ariana-grande-breathin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3c1bfde3-719c-480d-a0e3-ef8ab749a5c3",
      externalLink: "https://musicbrainz.org/work/3c1bfde3-719c-480d-a0e3-ef8ab749a5c3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "breathin",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
