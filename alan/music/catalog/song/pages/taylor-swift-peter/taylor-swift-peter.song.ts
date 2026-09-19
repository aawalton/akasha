import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftPeter = {
  id: "019ea416-2f7f-7df6-997f-0dad346b4c4d",
  type: "page-type/song",
  slug: "taylor-swift-peter",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1da0b797-39ec-4920-bc60-ba655a5cf6ea",
      externalLink: "https://musicbrainz.org/work/1da0b797-39ec-4920-bc60-ba655a5cf6ea",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Peter",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
