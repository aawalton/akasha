import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftRed = {
  id: "019ea416-3252-7cca-8397-c63a34c4c25e",
  type: "page-type/song",
  slug: "taylor-swift-red",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "40d8c1f5-714d-4e36-8326-bb8300998ca7",
      externalLink: "https://musicbrainz.org/work/40d8c1f5-714d-4e36-8326-bb8300998ca7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Red",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
