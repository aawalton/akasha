import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSafeSound = {
  id: "019ea416-35c9-76aa-9dfc-56f943ccfb37",
  type: "page-type/song",
  slug: "taylor-swift-safe-sound",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "63899fdd-242f-4e29-a3cd-d3fbfb98f333",
      externalLink: "https://musicbrainz.org/work/63899fdd-242f-4e29-a3cd-d3fbfb98f333",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Safe & Sound",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
