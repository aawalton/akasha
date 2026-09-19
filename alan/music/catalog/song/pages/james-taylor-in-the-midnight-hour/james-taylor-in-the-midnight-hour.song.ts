import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorInTheMidnightHour = {
  id: "01a0b72f-4300-70eb-9b93-a2849279dc1b",
  type: "page-type/song",
  slug: "james-taylor-in-the-midnight-hour",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d9d1e4d7-2181-3565-89db-377d6b031af7",
      externalLink: "https://musicbrainz.org/work/d9d1e4d7-2181-3565-89db-377d6b031af7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In the Midnight Hour",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
