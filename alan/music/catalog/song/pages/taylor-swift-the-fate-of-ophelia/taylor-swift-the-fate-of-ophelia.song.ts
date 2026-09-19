import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheFateOfOphelia = {
  id: "019ea416-2da5-7dd3-b9ac-dc60676e5d68",
  type: "page-type/song",
  slug: "taylor-swift-the-fate-of-ophelia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "00fb8e69-93d8-4523-9b41-d6e0b9fd15ae",
      externalLink: "https://musicbrainz.org/work/00fb8e69-93d8-4523-9b41-d6e0b9fd15ae",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Fate of Ophelia",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
