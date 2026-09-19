import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftEndGame = {
  id: "019ea416-1781-75b9-8354-124de46224fe",
  type: "page-type/song",
  slug: "taylor-swift-end-game",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e449c947-9f26-4580-b8da-4ca64d7bfd3e",
      externalLink: "https://musicbrainz.org/work/e449c947-9f26-4580-b8da-4ca64d7bfd3e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "End Game",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
