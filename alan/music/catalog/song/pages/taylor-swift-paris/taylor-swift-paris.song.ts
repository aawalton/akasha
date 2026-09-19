import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftParis = {
  id: "019ea416-33b8-71f1-93dd-1b1b518497a9",
  type: "page-type/song",
  slug: "taylor-swift-paris",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "57af580f-4e62-4a5d-809d-3cd923b26a36",
      externalLink: "https://musicbrainz.org/work/57af580f-4e62-4a5d-809d-3cd923b26a36",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Paris",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
