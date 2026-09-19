import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSilentNight = {
  id: "019ea416-3450-74db-8997-6809889ddf4e",
  type: "page-type/song",
  slug: "taylor-swift-silent-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "590e5567-c188-31f0-b7a8-a94e7e51c7b3",
      externalLink: "https://musicbrainz.org/work/590e5567-c188-31f0-b7a8-a94e7e51c7b3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Silent Night",
  artist: "artist/taylor-swift",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
