import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBlankSpace = {
  id: "019ea416-0298-7727-96de-056ed3e397b8",
  type: "page-type/song",
  slug: "taylor-swift-blank-space",
  partOfCollections: ["artist/imagine-dragons"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "05980852-95f4-4ea2-806a-abf1666951b8",
      externalLink: "https://musicbrainz.org/work/05980852-95f4-4ea2-806a-abf1666951b8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blank Space",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:06.424Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
