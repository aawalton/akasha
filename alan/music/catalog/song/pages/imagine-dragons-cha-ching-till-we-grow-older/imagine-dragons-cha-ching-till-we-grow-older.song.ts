import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsChaChingTillWeGrowOlder = {
  id: "019ea498-3476-7d34-b2c1-4c92e1b56a40",
  type: "page-type/song",
  slug: "imagine-dragons-cha-ching-till-we-grow-older",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "504ca0d3-9516-4ca8-a4ce-2d76a9987a1a",
      externalLink: "https://musicbrainz.org/work/504ca0d3-9516-4ca8-a4ce-2d76a9987a1a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cha‐Ching (Till We Grow Older)",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
