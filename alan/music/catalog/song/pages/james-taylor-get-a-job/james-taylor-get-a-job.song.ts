import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorGetAJob = {
  id: "01a0b72f-305b-7da4-bfec-b73bf8f8d0a0",
  type: "page-type/song",
  slug: "james-taylor-get-a-job",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e27581bd-79e7-488c-b647-ae29fb481381",
      externalLink: "https://musicbrainz.org/work/e27581bd-79e7-488c-b647-ae29fb481381",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Get a Job",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
