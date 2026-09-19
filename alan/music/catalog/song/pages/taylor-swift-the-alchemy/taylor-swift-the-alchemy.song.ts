import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheAlchemy = {
  id: "019ea416-3fe6-7e6b-981f-c58c680acd44",
  type: "page-type/song",
  slug: "taylor-swift-the-alchemy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ebbfac52-42ca-48e1-b833-4b724c61bf75",
      externalLink: "https://musicbrainz.org/work/ebbfac52-42ca-48e1-b833-4b724c61bf75",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Alchemy",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
