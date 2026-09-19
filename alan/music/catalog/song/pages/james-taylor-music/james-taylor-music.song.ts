import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMusic = {
  id: "01a0b72f-34fc-7938-9809-1f553757c15d",
  type: "page-type/song",
  slug: "james-taylor-music",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "32b03c03-f5b1-4c4a-b9e4-eec5956f56b4",
      externalLink: "https://musicbrainz.org/work/32b03c03-f5b1-4c4a-b9e4-eec5956f56b4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Music",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
