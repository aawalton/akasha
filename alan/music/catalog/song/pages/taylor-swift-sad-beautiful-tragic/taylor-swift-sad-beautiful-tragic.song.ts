import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSadBeautifulTragic = {
  id: "019ea416-35fd-77e8-9bb7-d0893c360454",
  type: "page-type/song",
  slug: "taylor-swift-sad-beautiful-tragic",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "65aa5927-770d-4ff9-8fab-6fbd6b9e4e63",
      externalLink: "https://musicbrainz.org/work/65aa5927-770d-4ff9-8fab-6fbd6b9e4e63",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sad Beautiful Tragic",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
