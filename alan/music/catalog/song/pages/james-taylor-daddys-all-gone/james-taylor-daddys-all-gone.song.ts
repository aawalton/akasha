import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorDaddysAllGone = {
  id: "01a0b72f-2f1f-703f-85bf-23fcf10ce8ba",
  type: "page-type/song",
  slug: "james-taylor-daddys-all-gone",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c844be42-dd8f-423e-b198-d1e4e098adf0",
      externalLink: "https://musicbrainz.org/work/c844be42-dd8f-423e-b198-d1e4e098adf0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Daddy’s All Gone",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
