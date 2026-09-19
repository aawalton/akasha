import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTimMcgraw = {
  id: "019ea416-4908-7dc2-a9b2-c8f8ee46167b",
  type: "page-type/song",
  slug: "taylor-swift-tim-mcgraw",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aa3a2227-dc87-4635-8b67-629be32e7bf9",
      externalLink: "https://musicbrainz.org/work/aa3a2227-dc87-4635-8b67-629be32e7bf9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tim McGraw",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
