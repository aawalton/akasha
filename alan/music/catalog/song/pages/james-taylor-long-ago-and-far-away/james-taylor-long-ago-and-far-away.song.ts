import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLongAgoAndFarAway = {
  id: "01a0b72f-3430-7cdd-a9ce-f3817668d20d",
  type: "page-type/song",
  slug: "james-taylor-long-ago-and-far-away",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "27479dd6-8ddf-4847-9660-ac891860ed14",
      externalLink: "https://musicbrainz.org/work/27479dd6-8ddf-4847-9660-ac891860ed14",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Long Ago and Far Away",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
