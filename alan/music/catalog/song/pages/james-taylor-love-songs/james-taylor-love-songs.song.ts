import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLoveSongs = {
  id: "01a0b72f-39ff-7f09-8b21-08d28b50f213",
  type: "page-type/song",
  slug: "james-taylor-love-songs",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "824f7458-797d-49fc-84d3-f17a2e8f67e6",
      externalLink: "https://musicbrainz.org/work/824f7458-797d-49fc-84d3-f17a2e8f67e6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love Songs",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
