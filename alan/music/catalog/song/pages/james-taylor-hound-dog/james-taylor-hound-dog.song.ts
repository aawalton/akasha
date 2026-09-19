import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHoundDog = {
  id: "01a0b72f-29e3-7c17-9f42-84286b3313e5",
  type: "page-type/song",
  slug: "james-taylor-hound-dog",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "97a0c5bb-5410-35c0-92b2-927f7e458bec",
      externalLink: "https://musicbrainz.org/work/97a0c5bb-5410-35c0-92b2-927f7e458bec",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hound Dog",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
