import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBlossom = {
  id: "01a0b72f-2cdd-72d4-8027-ce809ef8617c",
  type: "page-type/song",
  slug: "james-taylor-blossom",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b94891dd-839a-3b36-a3e1-c604f4a0741d",
      externalLink: "https://musicbrainz.org/work/b94891dd-839a-3b36-a3e1-c604f4a0741d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blossom",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
