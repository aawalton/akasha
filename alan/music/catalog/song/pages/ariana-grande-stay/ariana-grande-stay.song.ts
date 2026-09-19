import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeStay = {
  id: "01a0b76f-f363-7bdb-ac02-ac5eca9c4751",
  type: "page-type/song",
  slug: "ariana-grande-stay",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9a609022-1155-46a2-9926-b0451a3ea036",
      externalLink: "https://musicbrainz.org/work/9a609022-1155-46a2-9926-b0451a3ea036",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "stay",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
