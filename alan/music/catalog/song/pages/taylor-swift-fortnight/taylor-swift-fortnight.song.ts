import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftFortnight = {
  id: "019ea416-25f3-7554-ad69-20b644de7bc2",
  type: "page-type/song",
  slug: "taylor-swift-fortnight",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9fdc1f4e-b3bf-4453-9d44-933d9937cb4a",
      externalLink: "https://musicbrainz.org/work/9fdc1f4e-b3bf-4453-9d44-933d9937cb4a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fortnight",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
