import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheLifeOfAShowgirl = {
  id: "019ea416-3ef7-7438-b09d-0b122ab4f254",
  type: "page-type/song",
  slug: "taylor-swift-the-life-of-a-showgirl",
  partOfCollections: ["artist/sabrina-carpenter"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e0e31026-dc50-4f9e-8414-b1f13ac1d593",
      externalLink: "https://musicbrainz.org/work/e0e31026-dc50-4f9e-8414-b1f13ac1d593",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Life of a Showgirl",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
