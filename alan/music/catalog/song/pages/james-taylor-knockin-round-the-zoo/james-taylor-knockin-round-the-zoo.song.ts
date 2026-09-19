import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorKnockinRoundTheZoo = {
  id: "01a0b72f-3b57-72f0-b40a-37de0fd6625b",
  type: "page-type/song",
  slug: "james-taylor-knockin-round-the-zoo",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "936f3f29-b9ea-44b7-b72b-e31b377ff1e8",
      externalLink: "https://musicbrainz.org/work/936f3f29-b9ea-44b7-b72b-e31b377ff1e8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Knockin 'round the Zoo",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
