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
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
