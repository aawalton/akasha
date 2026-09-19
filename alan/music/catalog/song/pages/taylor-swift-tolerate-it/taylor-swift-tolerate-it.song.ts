import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTolerateIt = {
  id: "019ea416-4729-7f5f-9fcd-bd791680cbf3",
  type: "page-type/song",
  slug: "taylor-swift-tolerate-it",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8891737d-96ae-459c-86ac-ae11399652d7",
      externalLink: "https://musicbrainz.org/work/8891737d-96ae-459c-86ac-ae11399652d7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "tolerate it",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
