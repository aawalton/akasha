import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftGlitch = {
  id: "019ea416-28f1-7316-9a39-a6ee7d594362",
  type: "page-type/song",
  slug: "taylor-swift-glitch",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "be72a7cb-67b8-4551-8ed5-d8f0c9752e9e",
      externalLink: "https://musicbrainz.org/work/be72a7cb-67b8-4551-8ed5-d8f0c9752e9e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Glitch",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
