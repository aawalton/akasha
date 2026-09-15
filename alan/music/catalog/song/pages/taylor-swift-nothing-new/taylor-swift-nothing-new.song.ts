import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftNothingNew = {
  id: "019ea416-3a13-724e-b8c9-8508bc1d19c6",
  type: "song",
  slug: "taylor-swift-nothing-new",
  title: "Nothing New",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a3e66fff-9c5a-4cc4-a783-ea2be3848d6c",
      externalLink: "https://musicbrainz.org/work/a3e66fff-9c5a-4cc4-a783-ea2be3848d6c",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
