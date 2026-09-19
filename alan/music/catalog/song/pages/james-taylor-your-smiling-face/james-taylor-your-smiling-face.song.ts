import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorYourSmilingFace = {
  id: "01a0b72f-573f-7a55-ba4a-eb2604768920",
  type: "page-type/song",
  slug: "james-taylor-your-smiling-face",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d9da1318-0db4-4a29-966a-a7d91f295270",
      externalLink: "https://musicbrainz.org/work/d9da1318-0db4-4a29-966a-a7d91f295270",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Your Smiling Face",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
