import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftKarma = {
  id: "019ea416-20bc-768d-9c71-a5b5f52c0478",
  type: "page-type/song",
  slug: "taylor-swift-karma",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6e2a34d7-b4b5-41e3-a7e8-e307dca8c90b",
      externalLink: "https://musicbrainz.org/work/6e2a34d7-b4b5-41e3-a7e8-e307dca8c90b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Karma",
  artist: "artist/taylor-swift",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
