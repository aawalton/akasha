import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWandering = {
  id: "01a0b72f-559d-7d2d-a11f-010e94698e09",
  type: "page-type/song",
  slug: "james-taylor-wandering",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cad5d6cb-31e6-47c8-8898-687b6f3424ab",
      externalLink: "https://musicbrainz.org/work/cad5d6cb-31e6-47c8-8898-687b6f3424ab",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wandering",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
