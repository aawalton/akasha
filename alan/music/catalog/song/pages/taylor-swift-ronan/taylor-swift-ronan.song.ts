import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftRonan = {
  id: "019ea416-3cb2-7503-9f7a-2e1b73bf8644",
  type: "page-type/song",
  slug: "taylor-swift-ronan",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "caecc528-1dbb-4228-bbbe-18f7d2da1982",
      externalLink: "https://musicbrainz.org/work/caecc528-1dbb-4228-bbbe-18f7d2da1982",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ronan",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
