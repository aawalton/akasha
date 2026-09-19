import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayBirds = {
  id: "01a0ba5d-3d6e-7886-9fe3-5bb9dc030161",
  type: "page-type/song",
  slug: "coldplay-birds",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5d330b40-90be-4a43-97b1-2d8da7ade9a6",
      externalLink: "https://musicbrainz.org/work/5d330b40-90be-4a43-97b1-2d8da7ade9a6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Birds",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
