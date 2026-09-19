import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMoneyMachine = {
  id: "01a0b72f-41d2-7af1-9d69-b5a732383cf3",
  type: "page-type/song",
  slug: "james-taylor-money-machine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cc3f0dbf-043b-4ba8-8334-c792362afc40",
      externalLink: "https://musicbrainz.org/work/cc3f0dbf-043b-4ba8-8334-c792362afc40",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Money Machine",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
