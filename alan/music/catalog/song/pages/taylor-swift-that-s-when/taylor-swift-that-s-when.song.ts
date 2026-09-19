import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftThatSWhen = {
  id: "019ea416-3082-77f0-9191-dc39751300c1",
  type: "page-type/song",
  slug: "taylor-swift-that-s-when",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2f832526-91e4-4e09-b950-54b047a7aeff",
      externalLink: "https://musicbrainz.org/work/2f832526-91e4-4e09-b950-54b047a7aeff",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "That’s When",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
