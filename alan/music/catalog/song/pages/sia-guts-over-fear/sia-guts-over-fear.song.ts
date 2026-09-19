import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaGutsOverFear = {
  id: "01a0ba9e-1428-75e0-b952-05ceb6a6a11a",
  type: "page-type/song",
  slug: "sia-guts-over-fear",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "271fb0f2-dc23-4cc4-a99d-37de5b504aa6",
      externalLink: "https://musicbrainz.org/work/271fb0f2-dc23-4cc4-a99d-37de5b504aa6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Guts Over Fear",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
