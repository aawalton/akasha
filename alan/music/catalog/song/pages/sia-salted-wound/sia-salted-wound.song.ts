import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSaltedWound = {
  id: "019ea4cc-9989-75e5-a4a4-f3a66bf615d5",
  type: "page-type/song",
  slug: "sia-salted-wound",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6a69e299-d3bf-4054-8f5a-46ceb78ec656",
      externalLink: "https://musicbrainz.org/work/6a69e299-d3bf-4054-8f5a-46ceb78ec656",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Salted Wound",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:15:32.617Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
