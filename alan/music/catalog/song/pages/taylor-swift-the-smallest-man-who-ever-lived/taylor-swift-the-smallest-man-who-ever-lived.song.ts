import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheSmallestManWhoEverLived = {
  id: "019ea416-38e7-798f-9762-bc4df8219861",
  type: "page-type/song",
  slug: "taylor-swift-the-smallest-man-who-ever-lived",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8978f48b-15b0-46bb-b136-10c12024a13c",
      externalLink: "https://musicbrainz.org/work/8978f48b-15b0-46bb-b136-10c12024a13c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Smallest Man Who Ever Lived",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
