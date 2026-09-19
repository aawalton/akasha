import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorDownInTheHole = {
  id: "01a0b72f-31b5-7dfb-9eee-574c88ed4d02",
  type: "page-type/song",
  slug: "james-taylor-down-in-the-hole",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f71ac7cd-af0f-49d3-a553-7e9dc96e0b2f",
      externalLink: "https://musicbrainz.org/work/f71ac7cd-af0f-49d3-a553-7e9dc96e0b2f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Down in the Hole",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
