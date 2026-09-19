import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLineEmUp = {
  id: "01a0b72f-3fe8-727a-af80-8b01b7c9739d",
  type: "page-type/song",
  slug: "james-taylor-line-em-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c0616d79-cf23-3804-9569-1286f012024f",
      externalLink: "https://musicbrainz.org/work/c0616d79-cf23-3804-9569-1286f012024f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Line 'em Up",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
