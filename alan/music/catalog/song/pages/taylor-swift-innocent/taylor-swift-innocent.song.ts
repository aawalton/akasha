import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftInnocent = {
  id: "019ea416-1c49-71b0-b886-73557df5a20c",
  type: "page-type/song",
  slug: "taylor-swift-innocent",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3129cee4-2054-3e52-a5ae-50e00584f2f6",
      externalLink: "https://musicbrainz.org/work/3129cee4-2054-3e52-a5ae-50e00584f2f6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Innocent",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:13.001Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
