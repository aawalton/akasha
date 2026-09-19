import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorAnotherGreyMorning = {
  id: "01a0b72f-1eb4-700f-9202-8b8e67622f8f",
  type: "page-type/song",
  slug: "james-taylor-another-grey-morning",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "00e018a7-dc43-4e81-ae6c-8e8fa717a878",
      externalLink: "https://musicbrainz.org/work/00e018a7-dc43-4e81-ae6c-8e8fa717a878",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Another Grey Morning",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
