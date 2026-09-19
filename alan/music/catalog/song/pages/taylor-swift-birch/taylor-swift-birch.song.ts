import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBirch = {
  id: "019ea416-15da-78f9-aab4-7bfa4e88aac4",
  type: "page-type/song",
  slug: "taylor-swift-birch",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d3af16c7-29bc-443a-a3b3-99a4c001cb0b",
      externalLink: "https://musicbrainz.org/work/d3af16c7-29bc-443a-a3b3-99a4c001cb0b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Birch",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
