import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaCloud = {
  id: "019ea4c3-fba2-727b-b26d-6f910646f625",
  type: "page-type/song",
  slug: "sia-cloud",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6179061c-0320-493a-a856-4a6cdb7a45c9",
      externalLink: "https://musicbrainz.org/work/6179061c-0320-493a-a856-4a6cdb7a45c9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cloud",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
