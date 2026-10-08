import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWonderland = {
  id: "019ea416-4bdd-78c2-8fda-8a0c4dc52a45",
  type: "page-type/song",
  slug: "taylor-swift-wonderland",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f29d46db-d630-4778-a071-de8f3d5fdff2",
      externalLink: "https://musicbrainz.org/work/f29d46db-d630-4778-a071-de8f3d5fdff2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wonderland",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:25.181Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
