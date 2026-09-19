import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraYouCantRunFromYourself = {
  id: "01a0ba99-76af-75e7-bf21-d0dcae391a2c",
  type: "page-type/song",
  slug: "aurora-you-cant-run-from-yourself",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1fc3592f-8ca2-4bc5-a02e-3be22bd3f25a",
      externalLink: "https://musicbrainz.org/work/1fc3592f-8ca2-4bc5-a02e-3be22bd3f25a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Can’t Run From Yourself",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
