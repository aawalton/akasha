import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTheWaterIsWide = {
  id: "01a0b72f-52ba-763b-9fce-0235450bf29f",
  type: "page-type/song",
  slug: "james-taylor-the-water-is-wide",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b903c3a2-4151-458d-a97c-0199cc76e88d",
      externalLink: "https://musicbrainz.org/work/b903c3a2-4151-458d-a97c-0199cc76e88d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Water Is Wide",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
