import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheProphecy = {
  id: "019ea416-30eb-7a00-bff5-dcdd7c716400",
  type: "page-type/song",
  slug: "taylor-swift-the-prophecy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "38d41a0d-a8e5-424f-9dbb-4f4b5d086498",
      externalLink: "https://musicbrainz.org/work/38d41a0d-a8e5-424f-9dbb-4f4b5d086498",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Prophecy",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
