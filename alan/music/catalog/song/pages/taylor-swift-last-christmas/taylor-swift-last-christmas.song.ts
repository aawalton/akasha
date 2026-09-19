import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLastChristmas = {
  id: "01a0ba97-5ea6-7bc9-becd-f006635e41e0",
  type: "page-type/song",
  slug: "taylor-swift-last-christmas",
  partOfCollections: ["artist/ariana-grande", "artist/kelly-clarkson"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8e438d29-bc0b-3cfe-8c47-17e14113a3c3",
      externalLink: "https://musicbrainz.org/work/8e438d29-bc0b-3cfe-8c47-17e14113a3c3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Last Christmas",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
