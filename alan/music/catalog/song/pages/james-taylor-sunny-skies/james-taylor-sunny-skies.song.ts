import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSunnySkies = {
  id: "01a0b72f-4d71-7189-85a0-35b668354231",
  type: "page-type/song",
  slug: "james-taylor-sunny-skies",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "695c175d-bd7c-3ab6-80f3-fe6880a6f07b",
      externalLink: "https://musicbrainz.org/work/695c175d-bd7c-3ab6-80f3-fe6880a6f07b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sunny Skies",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
