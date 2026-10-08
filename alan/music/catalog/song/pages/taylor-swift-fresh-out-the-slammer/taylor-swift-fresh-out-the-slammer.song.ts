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
  createdAt: "2026-06-07T21:56:12.950Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
