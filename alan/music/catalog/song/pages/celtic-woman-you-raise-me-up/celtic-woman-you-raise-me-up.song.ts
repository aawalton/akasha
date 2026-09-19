import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanYouRaiseMeUp = {
  id: "01a0b720-0e14-70a5-a814-4a4a5b5a6908",
  type: "page-type/song",
  slug: "celtic-woman-you-raise-me-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6d28e1b7-2627-3a5a-aa3c-007fb0dde9ef",
      externalLink: "https://musicbrainz.org/work/6d28e1b7-2627-3a5a-aa3c-007fb0dde9ef",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Raise Me Up",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
