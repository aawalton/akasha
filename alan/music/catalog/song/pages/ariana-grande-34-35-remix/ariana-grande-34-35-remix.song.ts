import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrande3435Remix = {
  id: "01a0b7ca-af93-737e-b045-d26e80fab1af",
  type: "page-type/song",
  slug: "ariana-grande-34-35-remix",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1ae8cc10-9bcd-4244-b2b1-3e2f88dddd06",
      externalLink: "https://musicbrainz.org/work/1ae8cc10-9bcd-4244-b2b1-3e2f88dddd06",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "34+35 (remix)",
  artist: "artist/ariana-grande",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
