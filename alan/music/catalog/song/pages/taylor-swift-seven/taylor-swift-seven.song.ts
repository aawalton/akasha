import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSeven = {
  id: "019ea416-31ee-7c82-b530-1d2690389274",
  type: "page-type/song",
  slug: "taylor-swift-seven",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ff83ae5-845a-4cc7-a794-06c1be11f647",
      externalLink: "https://musicbrainz.org/work/3ff83ae5-845a-4cc7-a794-06c1be11f647",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "seven",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
