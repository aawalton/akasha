import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSweetener = {
  id: "019ea4e7-8ad0-7563-b2bb-1ef85030bd1b",
  type: "page-type/song",
  slug: "ariana-grande-sweetener",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c84d34d7-7a6f-4a7c-8ef8-2d27e20cf743",
      externalLink: "https://musicbrainz.org/work/c84d34d7-7a6f-4a7c-8ef8-2d27e20cf743",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "sweetener",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
