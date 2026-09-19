import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheMan = {
  id: "019ea416-3382-7cbd-a1a3-d535535c55d9",
  type: "page-type/song",
  slug: "taylor-swift-the-man",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "543dec53-ac04-4b41-a96e-f26b2ad8f02e",
      externalLink: "https://musicbrainz.org/work/543dec53-ac04-4b41-a96e-f26b2ad8f02e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Man",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
