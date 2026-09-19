import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorItsOnlyAPaperMoon = {
  id: "01a0b72f-3488-7dcb-8788-4b38c63fd183",
  type: "page-type/song",
  slug: "james-taylor-its-only-a-paper-moon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "28e35529-efef-3926-972f-2bb9171cdfa1",
      externalLink: "https://musicbrainz.org/work/28e35529-efef-3926-972f-2bb9171cdfa1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It’s Only a Paper Moon",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
