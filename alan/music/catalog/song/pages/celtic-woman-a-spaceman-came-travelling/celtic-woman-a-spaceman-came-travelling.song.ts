import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanASpacemanCameTravelling = {
  id: "01a0b720-16a5-766e-b0ad-894549f12f5e",
  type: "page-type/song",
  slug: "celtic-woman-a-spaceman-came-travelling",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fdf0e022-4478-4d52-aa21-2a308f08c6e7",
      externalLink: "https://musicbrainz.org/work/fdf0e022-4478-4d52-aa21-2a308f08c6e7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Spaceman Came Travelling",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
