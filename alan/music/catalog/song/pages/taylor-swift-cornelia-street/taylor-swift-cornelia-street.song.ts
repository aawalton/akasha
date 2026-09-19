import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftCorneliaStreet = {
  id: "019ea416-13d1-7579-9001-cf8b345800ea",
  type: "page-type/song",
  slug: "taylor-swift-cornelia-street",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c1fe611b-d5c6-42ef-b932-ec66a783ec9e",
      externalLink: "https://musicbrainz.org/work/c1fe611b-d5c6-42ef-b932-ec66a783ec9e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cornelia Street",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
