import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorFadingAway = {
  id: "01a0b72f-2408-7d90-a7d0-78040fd006ac",
  type: "page-type/song",
  slug: "james-taylor-fading-away",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4978a8f2-5cd8-4cd2-bb26-63d76288b262",
      externalLink: "https://musicbrainz.org/work/4978a8f2-5cd8-4cd2-bb26-63d76288b262",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fading Away",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
