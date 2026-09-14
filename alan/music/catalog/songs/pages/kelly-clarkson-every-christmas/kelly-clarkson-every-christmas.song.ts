import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const kellyClarksonEveryChristmas = {
  id: "019ea4af-0275-7044-b0b3-2597eb75d9db",
  type: "song",
  slug: "kelly-clarkson-every-christmas",
  title: "Every Christmas",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79ee9303-c009-4bad-a7af-f3628561ebda",
      externalLink: "https://musicbrainz.org/work/79ee9303-c009-4bad-a7af-f3628561ebda",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
