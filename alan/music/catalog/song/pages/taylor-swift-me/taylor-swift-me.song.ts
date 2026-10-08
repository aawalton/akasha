import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMe = {
  id: "019ea416-2c21-7a81-b2b0-2e75ae4b904e",
  type: "page-type/song",
  slug: "taylor-swift-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f58825b5-1983-4312-8b6b-a6cd366d395a",
      externalLink: "https://musicbrainz.org/work/f58825b5-1983-4312-8b6b-a6cd366d395a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ME!",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:17.057Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
