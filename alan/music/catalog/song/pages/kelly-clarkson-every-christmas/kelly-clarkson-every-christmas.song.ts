import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonEveryChristmas = {
  id: "019ea4af-0275-7044-b0b3-2597eb75d9db",
  type: "page-type/song",
  slug: "kelly-clarkson-every-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79ee9303-c009-4bad-a7af-f3628561ebda",
      externalLink: "https://musicbrainz.org/work/79ee9303-c009-4bad-a7af-f3628561ebda",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Every Christmas",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
