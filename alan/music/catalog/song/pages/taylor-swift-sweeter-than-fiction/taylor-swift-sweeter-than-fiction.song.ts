import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSweeterThanFiction = {
  id: "019ea416-397c-74ca-b4bb-3ccfc15b94bd",
  type: "page-type/song",
  slug: "taylor-swift-sweeter-than-fiction",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9c15e68c-eb64-4e6b-932d-813057aea16e",
      externalLink: "https://musicbrainz.org/work/9c15e68c-eb64-4e6b-932d-813057aea16e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sweeter Than Fiction",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:20.476Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
