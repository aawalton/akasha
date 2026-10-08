import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHighInfidelity = {
  id: "019ea416-2821-7c4b-a4df-ba180341d7b6",
  type: "page-type/song",
  slug: "taylor-swift-high-infidelity",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b2f484e1-9e75-4142-91dd-479b1546b09b",
      externalLink: "https://musicbrainz.org/work/b2f484e1-9e75-4142-91dd-479b1546b09b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "High Infidelity",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:16.033Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
