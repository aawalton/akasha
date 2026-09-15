import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBeginAgain = {
  id: "019ea416-15a8-7168-9d4c-63d90bbe19d8",
  type: "song",
  slug: "taylor-swift-begin-again",
  title: "Begin Again",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d1824200-db72-4350-bbe5-489aaf80464e",
      externalLink: "https://musicbrainz.org/work/d1824200-db72-4350-bbe5-489aaf80464e",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
