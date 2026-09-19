import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOnlyForMe = {
  id: "01a0b72f-376a-75c5-98ad-e1098ad5165d",
  type: "page-type/song",
  slug: "james-taylor-only-for-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5d7c83c3-ee97-4522-aec0-5ad946971f86",
      externalLink: "https://musicbrainz.org/work/5d7c83c3-ee97-4522-aec0-5ad946971f86",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Only for Me",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
