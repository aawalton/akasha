import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorNewTune = {
  id: "01a0b72f-3dab-7d43-9195-6229f3cceadb",
  type: "page-type/song",
  slug: "james-taylor-new-tune",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aeaf6a5b-f726-493c-96d0-dc809a624cd7",
      externalLink: "https://musicbrainz.org/work/aeaf6a5b-f726-493c-96d0-dc809a624cd7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "New Tune",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
