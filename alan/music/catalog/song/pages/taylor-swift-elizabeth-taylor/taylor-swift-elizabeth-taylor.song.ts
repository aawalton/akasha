import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftElizabethTaylor = {
  id: "019ea416-1438-7dd5-9164-b1c6cf01f143",
  type: "page-type/song",
  slug: "taylor-swift-elizabeth-taylor",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c3c0861e-b3c9-438e-bbe5-05b6f2396b31",
      externalLink: "https://musicbrainz.org/work/c3c0861e-b3c9-438e-bbe5-05b6f2396b31",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Elizabeth Taylor",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
