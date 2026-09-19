import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwift22 = {
  id: "019ea416-0261-73a9-8a1f-eafb9525ffaf",
  type: "page-type/song",
  slug: "taylor-swift-22",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "014f3f6c-e2b0-4217-9e3c-89abf919648b",
      externalLink: "https://musicbrainz.org/work/014f3f6c-e2b0-4217-9e3c-89abf919648b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "22",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
