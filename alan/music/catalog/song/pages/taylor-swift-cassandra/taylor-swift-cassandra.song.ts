import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftCassandra = {
  id: "019ea416-0517-7818-8f3c-d402efdede1b",
  type: "page-type/song",
  slug: "taylor-swift-cassandra",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2b82c0fb-4cd0-441f-8619-0684f12031fd",
      externalLink: "https://musicbrainz.org/work/2b82c0fb-4cd0-441f-8619-0684f12031fd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cassandra",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
