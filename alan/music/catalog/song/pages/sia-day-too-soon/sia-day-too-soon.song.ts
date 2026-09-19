import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDayTooSoon = {
  id: "019ea4c2-f9e3-71ba-a503-29fba7e439d3",
  type: "page-type/song",
  slug: "sia-day-too-soon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "195e5f3f-02ba-4ebb-ad3d-aa4de92cb25e",
      externalLink: "https://musicbrainz.org/work/195e5f3f-02ba-4ebb-ad3d-aa4de92cb25e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Day Too Soon",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
