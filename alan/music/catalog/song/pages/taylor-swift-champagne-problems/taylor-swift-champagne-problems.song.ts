import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftChampagneProblems = {
  id: "019ea416-10bc-7a26-a503-4aaa23f3b683",
  type: "song",
  slug: "taylor-swift-champagne-problems",
  title: "champagne problems",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a6503d19-0752-408b-9934-1ae426cf9a45",
      externalLink: "https://musicbrainz.org/work/a6503d19-0752-408b-9934-1ae426cf9a45",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "B+",
  singability: "A-",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
