import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwift222 = {
  id: "019ea416-0e95-79cb-bbd3-ad7c68d2c30c",
  type: "song",
  slug: "taylor-swift-22-2",
  title: "22",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "972e0c06-c474-40d1-8eea-8aeb510c0ae5",
      externalLink: "https://musicbrainz.org/work/972e0c06-c474-40d1-8eea-8aeb510c0ae5",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
