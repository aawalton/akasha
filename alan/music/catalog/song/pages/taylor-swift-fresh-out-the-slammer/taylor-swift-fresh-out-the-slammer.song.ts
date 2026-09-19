import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftFreshOutTheSlammer = {
  id: "019ea416-1c16-7aaa-aa6d-3ade7d51823d",
  type: "page-type/song",
  slug: "taylor-swift-fresh-out-the-slammer",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2c27d345-26d5-47d2-8628-152e36cf483d",
      externalLink: "https://musicbrainz.org/work/2c27d345-26d5-47d2-8628-152e36cf483d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fresh Out the Slammer",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
