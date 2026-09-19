import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOneMoreGoRound = {
  id: "01a0b72f-36f0-70cc-bcaf-e1780a3a3ff9",
  type: "page-type/song",
  slug: "james-taylor-one-more-go-round",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5654f72d-5cce-4d56-8f23-8c182c2e190e",
      externalLink: "https://musicbrainz.org/work/5654f72d-5cce-4d56-8f23-8c182c2e190e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One More Go Round",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
