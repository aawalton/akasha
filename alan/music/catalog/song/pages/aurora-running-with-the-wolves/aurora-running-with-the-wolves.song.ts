import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraRunningWithTheWolves = {
  id: "019ea4a6-56e8-7944-8fb5-0015f43c3bd1",
  type: "page-type/song",
  slug: "aurora-running-with-the-wolves",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9670461f-23ca-424e-8ad4-603b40a75eb6",
      externalLink: "https://musicbrainz.org/work/9670461f-23ca-424e-8ad4-603b40a75eb6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Running with the Wolves",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
