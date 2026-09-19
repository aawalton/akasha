import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheOtherSideOfTheDoor = {
  id: "019ea416-36ea-79a9-8043-d04c6623071c",
  type: "page-type/song",
  slug: "taylor-swift-the-other-side-of-the-door",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "710273e9-b0ea-4be1-87ca-5b85c39ccd33",
      externalLink: "https://musicbrainz.org/work/710273e9-b0ea-4be1-87ca-5b85c39ccd33",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Other Side of the Door",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
