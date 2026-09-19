import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBothOfUs = {
  id: "019ea416-10f0-7771-ba66-efeb5c3db614",
  type: "page-type/song",
  slug: "taylor-swift-both-of-us",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a9a4be86-8135-4b65-8193-2e56f08a4e6d",
      externalLink: "https://musicbrainz.org/work/a9a4be86-8135-4b65-8193-2e56f08a4e6d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Both of Us",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
