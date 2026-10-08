import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheBestDay = {
  id: "019ea416-40e9-7a5b-9a00-31dd37cbf3b3",
  type: "page-type/song",
  slug: "taylor-swift-the-best-day",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f1921180-ce7d-356a-91df-0422b3c71d16",
      externalLink: "https://musicbrainz.org/work/f1921180-ce7d-356a-91df-0422b3c71d16",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Best Day",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:22.377Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
