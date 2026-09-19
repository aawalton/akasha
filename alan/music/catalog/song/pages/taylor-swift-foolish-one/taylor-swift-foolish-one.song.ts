import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftFoolishOne = {
  id: "019ea416-1f4b-739a-a138-4c378b246264",
  type: "page-type/song",
  slug: "taylor-swift-foolish-one",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5c8c4f39-ace8-4079-b9d4-555df1e2e546",
      externalLink: "https://musicbrainz.org/work/5c8c4f39-ace8-4079-b9d4-555df1e2e546",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Foolish One",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
