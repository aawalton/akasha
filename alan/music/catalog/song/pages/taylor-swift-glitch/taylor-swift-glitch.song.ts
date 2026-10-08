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
  createdAt: "2026-06-07T21:56:16.241Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
