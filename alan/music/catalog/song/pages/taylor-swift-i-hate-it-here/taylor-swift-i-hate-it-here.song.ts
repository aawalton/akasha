import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIHateItHere = {
  id: "019ea416-2b57-7b22-8a9b-4e5f4b9dccfc",
  type: "page-type/song",
  slug: "taylor-swift-i-hate-it-here",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ec98e655-0495-458d-8081-7fc2162a51cc",
      externalLink: "https://musicbrainz.org/work/ec98e655-0495-458d-8081-7fc2162a51cc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Hate It Here",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
