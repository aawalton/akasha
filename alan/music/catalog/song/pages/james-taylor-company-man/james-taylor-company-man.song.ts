import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorCompanyMan = {
  id: "01a0b72f-2096-7d19-8c4d-4bba080c5490",
  type: "page-type/song",
  slug: "james-taylor-company-man",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "15b4b16c-4a17-4acc-ac0f-d07f37710c82",
      externalLink: "https://musicbrainz.org/work/15b4b16c-4a17-4acc-ac0f-d07f37710c82",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Company Man",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
