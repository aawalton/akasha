import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSleepComeFreeMe = {
  id: "01a0b72f-46dd-7672-9274-a2963e503376",
  type: "page-type/song",
  slug: "james-taylor-sleep-come-free-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "15c028d3-1c88-4b12-aa46-e772908599fa",
      externalLink: "https://musicbrainz.org/work/15c028d3-1c88-4b12-aa46-e772908599fa",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sleep Come Free Me",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T01:02:03.997Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
