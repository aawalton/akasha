import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheJokerAndTheQueen = {
  id: "019ea416-3ec2-7c2b-88e6-4ee9e073ceae",
  type: "page-type/song",
  slug: "taylor-swift-the-joker-and-the-queen",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e0c92588-ed77-487b-b327-a9c7bbb324fd",
      externalLink: "https://musicbrainz.org/work/e0c92588-ed77-487b-b327-a9c7bbb324fd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Joker and the Queen",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
