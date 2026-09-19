import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedOctoberPassedMeBy = {
  id: "01a0b724-d430-7a3d-ad6d-51c13f8fbf23",
  type: "page-type/song",
  slug: "girl-in-red-october-passed-me-by",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a6250de5-5a60-4096-bf3b-85056c4e2e39",
      externalLink: "https://musicbrainz.org/work/a6250de5-5a60-4096-bf3b-85056c4e2e39",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "October Passed Me By",
  artist: "artist/girl-in-red",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
