import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandePetal = {
  id: "01a0b76f-f213-7335-97bf-27c96941a1d6",
  type: "page-type/song",
  slug: "ariana-grande-petal",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "23ce97d3-1081-432c-9f46-0d44ac563ed4",
      externalLink: "https://musicbrainz.org/work/23ce97d3-1081-432c-9f46-0d44ac563ed4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "petal",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
