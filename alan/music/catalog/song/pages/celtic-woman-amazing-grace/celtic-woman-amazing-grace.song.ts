import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanAmazingGrace = {
  id: "01a0b720-11dc-7372-8f1c-64692c78ba09",
  type: "page-type/song",
  slug: "celtic-woman-amazing-grace",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a5393197-4f8e-31f3-a535-2de2ff275133",
      externalLink: "https://musicbrainz.org/work/a5393197-4f8e-31f3-a535-2de2ff275133",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Amazing Grace",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
