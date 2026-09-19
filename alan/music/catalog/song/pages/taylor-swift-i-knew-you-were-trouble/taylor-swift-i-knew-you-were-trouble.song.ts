import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIKnewYouWereTrouble = {
  id: "019ea416-235e-7886-91b2-0b720d6dfca4",
  type: "page-type/song",
  slug: "taylor-swift-i-knew-you-were-trouble",
  partOfCollections: ["artist/sabrina-carpenter"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8a999d24-acbb-4992-b580-030b2fe83e90",
      externalLink: "https://musicbrainz.org/work/8a999d24-acbb-4992-b580-030b2fe83e90",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Knew You Were Trouble.",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
