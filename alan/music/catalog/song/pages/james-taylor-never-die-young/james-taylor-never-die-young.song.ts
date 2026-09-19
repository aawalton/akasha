import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorNeverDieYoung = {
  id: "01a0b72f-4445-7a05-8270-e6e0d015c96f",
  type: "page-type/song",
  slug: "james-taylor-never-die-young",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ee489e5a-e0a7-34e0-ad98-0d58fea625d7",
      externalLink: "https://musicbrainz.org/work/ee489e5a-e0a7-34e0-ad98-0d58fea625d7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Never Die Young",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
