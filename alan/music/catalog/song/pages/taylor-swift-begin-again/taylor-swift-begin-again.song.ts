import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBeginAgain = {
  id: "019ea416-15a8-7168-9d4c-63d90bbe19d8",
  type: "page-type/song",
  slug: "taylor-swift-begin-again",
  partOfCollections: ["artist/the-piano-guys"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d1824200-db72-4350-bbe5-489aaf80464e",
      externalLink: "https://musicbrainz.org/work/d1824200-db72-4350-bbe5-489aaf80464e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Begin Again",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:11.304Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
