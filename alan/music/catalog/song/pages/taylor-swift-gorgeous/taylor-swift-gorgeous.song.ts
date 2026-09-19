import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftGorgeous = {
  id: "019ea416-192b-7a76-a270-feca1b48c617",
  type: "page-type/song",
  slug: "taylor-swift-gorgeous",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0ae906ea-8d92-44ae-99b1-2e2ae1483cd2",
      externalLink: "https://musicbrainz.org/work/0ae906ea-8d92-44ae-99b1-2e2ae1483cd2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Gorgeous",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
