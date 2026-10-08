import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLavenderHaze = {
  id: "019ea416-1e10-75c4-bb8c-63e01cc2ae8c",
  type: "page-type/song",
  slug: "taylor-swift-lavender-haze",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "45e258a3-4552-442c-ba22-7e5a6899c3e8",
      externalLink: "https://musicbrainz.org/work/45e258a3-4552-442c-ba22-7e5a6899c3e8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lavender Haze",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:13.456Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
