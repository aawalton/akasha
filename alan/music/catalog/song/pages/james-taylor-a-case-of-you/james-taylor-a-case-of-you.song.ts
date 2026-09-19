import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorACaseOfYou = {
  id: "01a0b72f-315d-7d04-ad9f-17ae6b38486b",
  type: "page-type/song",
  slug: "james-taylor-a-case-of-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f569738f-83ae-3310-a4b3-5ef0ba1c26c4",
      externalLink: "https://musicbrainz.org/work/f569738f-83ae-3310-a4b3-5ef0ba1c26c4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Case of You",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
