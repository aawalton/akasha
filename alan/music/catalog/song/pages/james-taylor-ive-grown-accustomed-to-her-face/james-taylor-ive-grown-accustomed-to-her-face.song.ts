import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorIveGrownAccustomedToHerFace = {
  id: "01a0b72f-3694-7a73-8503-c6838919e5cd",
  type: "page-type/song",
  slug: "james-taylor-ive-grown-accustomed-to-her-face",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "504446e5-b88e-3b94-bda1-8253d47ffcc2",
      externalLink: "https://musicbrainz.org/work/504446e5-b88e-3b94-bda1-8253d47ffcc2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’ve Grown Accustomed to Her Face",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
