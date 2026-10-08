import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaFairGame = {
  id: "019ea4c6-516e-758b-a354-44dcfec3cc00",
  type: "page-type/song",
  slug: "sia-fair-game",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "eb8fb54c-23df-4d2a-85ad-895ee8c4d1a6",
      externalLink: "https://musicbrainz.org/work/eb8fb54c-23df-4d2a-85ad-895ee8c4d1a6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fair Game",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:08:40.942Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
