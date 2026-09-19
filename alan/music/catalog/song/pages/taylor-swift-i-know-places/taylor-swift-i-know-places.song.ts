import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIKnowPlaces = {
  id: "019ea416-2b8a-775e-9fd5-3b53c64d0eb6",
  type: "page-type/song",
  slug: "taylor-swift-i-know-places",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "eebdb998-f0c2-4de6-9b5b-c3629a5d0bef",
      externalLink: "https://musicbrainz.org/work/eebdb998-f0c2-4de6-9b5b-c3629a5d0bef",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Know Places",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
