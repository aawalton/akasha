import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftCancelled = {
  id: "019ea416-11ce-70e9-a6cb-882b64621948",
  type: "page-type/song",
  slug: "taylor-swift-cancelled",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ac69f6dd-06b9-43db-ae1e-ed9847c2b44c",
      externalLink: "https://musicbrainz.org/work/ac69f6dd-06b9-43db-ae1e-ed9847c2b44c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "CANCELLED!",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:10.318Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
