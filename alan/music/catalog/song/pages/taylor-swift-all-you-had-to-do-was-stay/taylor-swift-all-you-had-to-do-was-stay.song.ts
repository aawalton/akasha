import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftAllYouHadToDoWasStay = {
  id: "019ea416-0c11-740e-b4e7-209d2de3da22",
  type: "page-type/song",
  slug: "taylor-swift-all-you-had-to-do-was-stay",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7368d69e-7c8d-4fcb-b6f5-3c42cd943731",
      externalLink: "https://musicbrainz.org/work/7368d69e-7c8d-4fcb-b6f5-3c42cd943731",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All You Had to Do Was Stay",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
