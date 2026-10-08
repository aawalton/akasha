import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLover = {
  id: "019ea416-2d40-7d6a-b361-dd68f34932a8",
  type: "page-type/song",
  slug: "taylor-swift-lover",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fbfa8834-ff6c-4279-a134-130650ad2c25",
      externalLink: "https://musicbrainz.org/work/fbfa8834-ff6c-4279-a134-130650ad2c25",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lover",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:17.344Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
