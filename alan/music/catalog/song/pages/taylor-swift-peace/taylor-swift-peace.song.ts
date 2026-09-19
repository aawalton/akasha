import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftPeace = {
  id: "019ea416-2deb-7af7-9a75-d8c8f09b6445",
  type: "page-type/song",
  slug: "taylor-swift-peace",
  rank: "S",
  tags: ["relationships"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "01a657bc-9eab-4839-9862-bb5f9ca71556",
      externalLink: "https://musicbrainz.org/work/01a657bc-9eab-4839-9862-bb5f9ca71556",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "peace",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "A-",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
