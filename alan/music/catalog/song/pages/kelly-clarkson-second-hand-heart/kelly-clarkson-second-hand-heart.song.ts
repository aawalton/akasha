import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonSecondHandHeart = {
  id: "019ea4b2-7e90-7a20-8bdf-529e82d882dc",
  type: "page-type/song",
  slug: "kelly-clarkson-second-hand-heart",
  title: "Second Hand Heart",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6e7a0137-54a4-4577-b20c-3bc4a8d15636",
      externalLink: "https://musicbrainz.org/work/6e7a0137-54a4-4577-b20c-3bc4a8d15636",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
