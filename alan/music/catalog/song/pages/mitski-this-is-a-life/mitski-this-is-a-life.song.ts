import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiThisIsALife = {
  id: "019f0ea6-109b-74fc-a7e7-91960f1fa7f7",
  type: "page-type/song",
  slug: "mitski-this-is-a-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c292148d-3381-4a01-a32d-b061397877da",
      externalLink: "https://musicbrainz.org/work/c292148d-3381-4a01-a32d-b061397877da",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "This Is a Life",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
