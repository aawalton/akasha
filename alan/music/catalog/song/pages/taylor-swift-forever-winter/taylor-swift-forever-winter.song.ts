import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftForeverWinter = {
  id: "019ea416-2788-7c07-a873-84fd6d4df077",
  type: "page-type/song",
  slug: "taylor-swift-forever-winter",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ad4b79c1-2a95-4387-a7cd-a7dbbdbe037a",
      externalLink: "https://musicbrainz.org/work/ad4b79c1-2a95-4387-a7cd-a7dbbdbe037a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Forever Winter",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
