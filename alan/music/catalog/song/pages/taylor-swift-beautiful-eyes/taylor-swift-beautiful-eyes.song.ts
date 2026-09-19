import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBeautifulEyes = {
  id: "019ea416-0a1f-79ab-b324-dc2c4d1d5f2b",
  type: "page-type/song",
  slug: "taylor-swift-beautiful-eyes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "67e90f42-0919-4797-8128-0e10b26995de",
      externalLink: "https://musicbrainz.org/work/67e90f42-0919-4797-8128-0e10b26995de",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Beautiful Eyes",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
