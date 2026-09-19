import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftChampagneProblems = {
  id: "019ea416-10bc-7a26-a503-4aaa23f3b683",
  type: "page-type/song",
  slug: "taylor-swift-champagne-problems",
  rank: "B+",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a6503d19-0752-408b-9934-1ae426cf9a45",
      externalLink: "https://musicbrainz.org/work/a6503d19-0752-408b-9934-1ae426cf9a45",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "champagne problems",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "A-",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
