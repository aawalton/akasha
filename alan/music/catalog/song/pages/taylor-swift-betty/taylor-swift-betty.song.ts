import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBetty = {
  id: "019ea416-1006-7074-92a5-61fca3cb4422",
  type: "page-type/song",
  slug: "taylor-swift-betty",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9f24824b-1777-45e1-a829-bba8f0ca5b27",
      externalLink: "https://musicbrainz.org/work/9f24824b-1777-45e1-a829-bba8f0ca5b27",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "betty",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:09.862Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
